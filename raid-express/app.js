const workerService = require('./worker_service')
const express = require('express');
const app = express();
const router = require('./router');
app.use(express.json());
const port = 3000;

router.initRoutes(app)
app.listen(port, async () => {
    await workerService.initClients();
    console.log(`Example app listening at http://localhost:${port}`)
});

