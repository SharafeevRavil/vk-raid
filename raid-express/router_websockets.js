const workerService = require('./worker_service');
const http_util = require('./http_util');
const captchaService = require('./captcha_service');

module.exports = {
    captcha: async (ws, req) => {
        const id = await captchaService.addClient(ws)

        ws.on('message', async (msg) => {
            console.log(msg);
            await captchaService.sendBroadcast(msg);
        });
        ws.on('close', req => {
            console.log(`Client ${id} disconnected`);
        });
        console.log(`Client ${id} connected to captcha`);
    }
};
