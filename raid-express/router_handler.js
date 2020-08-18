const workerService = require('./worker_service');
const http_util = require('./http_util');

module.exports = {
    status: (req, res) => {
        res.send(http_util.info())
    },
    trigger: (req, res) => {
        const id = req.body.id;
        let worker = workerService.workers.get(id);

        worker.postMessage('hui');

        res.send(http_util.info())
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
        if(body.login === undefined || body.password === undefined) {
            res.send({
                "error": "login and password should be not empty"
            });
            return
        }
        await workerService.addClient(body.login, body.password, body.type)
        await workerService.runWorkers();
        res.send(http_util.ok())
    }
};

