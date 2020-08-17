const predefinedUsers = require('./predefined_users.json')
const vkFunctions = require("./vk_function")
const chatName = "test"
const {Worker} = require('worker_threads')
const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

const vkClients = []
const workers = new Map()
var isEnabled = false

app.get('/status', (req, res) => {
    res.send({
        "count": vkClients.length,
        "isEnabled": isEnabled,
        "clients": vkClients.map(el => el.userId)
    })
})
app.post('/trigger', (req, res) => {
    const id = req.body.id
    let worker = workers.get(id);
    worker.postMessage({'hui': 'huiiii'})
    res.send({
        "count": vkClients.length,
        "isEnabled": isEnabled,
        "clients": vkClients.map(el => el.userId)
    })
})

app.post("/enable", (req, res) => {
    isEnabled = req.body.isEnabled
    runWorkers().catch(error => {
        console.log(error)
    })

    res.send({
        "message": "new value is " + isEnabled
    })
})

app.listen(port, async () => {
    await initClients()
    console.log(`Example app listening at http://localhost:${port}`)
})

const initClients = async () => {
    console.log("Starting...")
    for (let i in predefinedUsers) {
        const vk = await vkFunctions.doAuth(predefinedUsers[i].login, predefinedUsers[i].password)
        let token = vk.token;
        const chatId = await vkFunctions.getChatId(token, chatName)
        const userId = await vkFunctions.getUserId(token)
        const fullName = await vkFunctions.getFullName(token)
        vkClients.push({
            "token": token,
            "chatId": chatId,
            "userId": userId,
            "fullName": fullName,
        })
    }
    await runWorkers()
}

const runWorkers = async () => {
    console.log("Workers...")
    for (let i in vkClients) {
        vkClients[i].isEnabled = isEnabled
        await runService(vkClients[i])
    }
    console.log("Workers DONE")
}

function runService(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./service.js', {workerData});
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        })
        workers.set(workerData.userId, worker)
    })
}