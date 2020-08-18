const workerService = require('./worker_service')

module.exports = {
    status: (req, res) => {
        res.send(infoResponse())
    },
    trigger: (req, res) => {
        const id = req.body.id;
        let worker = workerService.workers.get(id);

        worker.postMessage('hui');

        res.send(infoResponse())
    },
    enable: async (req, res) => {
        workerService.isEnabled = req.body.isEnabled;
        await workerService.runWorkers();

        res.send({
            "message": "new value is " + workerService.isEnabled
        })
    },
    login: async (req, res) => {
        let body = req.body;
        if(body.login === 'undefined' || body.password === 'undefined') {
            res.send({
                "error": "login and password should be not empty"
            })
            return
        }
        await workerService.addClient(body.login, body.password)
        await workerService.runWorkers()
        res.send(OKResponse())
    }
}

function infoResponse() {
    return {
        "count": workerService.vkClients.length,
        "isEnabled": workerService.isEnabled,
        "clients": workerService.vkClients.map(el => el.userId)
    }
}

function OKResponse() {
    return {
        "message": "OK"
    }
}