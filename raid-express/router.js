const handler = require("./router_handler");
const wsHandler = require("./router_websockets");

function init(app) {
    app.post('/trigger', handler.trigger);
    //api
    app.post("/api/login", handler.login);
    app.post("/api/enable", handler.enable);
    app.get('/api/status', handler.status);
    //websockets
    app.ws('/ws/captcha', wsHandler.captcha);
}

module.exports = {
    initRoutes: init
};
