const vkFunctions = require("./vk_function");
const predefinedUsers = require('./predefined_users.json');
const {Worker} = require('worker_threads');
const chatName = "test";

const vkClients = [];
const workers = new Map();
let enabled = false;


const initClients = async () => {
    console.log("Starting...");
    for (let i in predefinedUsers) {
        await addClient(predefinedUsers[i].login, predefinedUsers[i].password)
    }
    await runWorkers()
};

const addClient = async (login, password) => {
    const vk = await vkFunctions.doAuth(login, password);
    let token = vk.token;
    const userId = await vkFunctions.getUserId(token);

    if(vkClients.filter(client => client.userId === userId).length !== 0) {
        console.log(`User exists ${userId}`)
        return;
    }

    const chatId = await vkFunctions.getChatId(token, chatName);
    const fullName = await vkFunctions.getFullName(token);
    vkClients.push({
        "token": token,
        "chatId": chatId,
        "userId": userId,
        "fullName": fullName,
        "isNew": true
    })
}

const runWorkers = async () => {
    console.log("Start workers...");
    const workerPromises = [];
    for (let i in vkClients) {
        if(vkClients[i].isNew){
            vkClients[i].isEnabled = enabled;
            workerPromises.push(runService(vkClients[i]));
            vkClients[i].isNew = false
        }
    }
    await Promise.all(workerPromises);
    console.log("Workers created")
};

function runService(workerData) {
    return new Promise((resolve, reject) => {
        console.log(`Create worker ${workerData.userId}`)
        const worker = new Worker('./service.js', {workerData});
        workers.set(workerData.userId, worker)
        worker.on('message', () => console.log('message from worker'));
        resolve();
    })
}

module.exports = {
    initClients: initClients,
    addClient: addClient,
    runWorkers: runWorkers,
    vkClients: vkClients,
    isEnabled: enabled,
    workers: workers
}