const workerService = require('./worker_service')
const captchaService = require('./captcha_service')

const express = require('express');
const app = express();
const router = require('./router');
app.use(express.json());
const port = 3000;

const expressWs = require('express-ws')(app);

router.initRoutes(app);
app.listen(port, async () => {
    await workerService.initClients();
    await captchaService.init(expressWs);
    console.log(`Example app listening at http://localhost:${port}`)
});
