const handler = require("./router_handler");

function init(app) {
    app.post('/trigger', handler.trigger);
    //api
    app.post("/api/login", handler.login);
    app.post("/api/enable", handler.enable);
    app.get('/api/status', handler.status);

}

module.exports = {
    initRoutes: init
}
