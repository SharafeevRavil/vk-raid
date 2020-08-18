const {isMainThread, parentPort, workerData, threadId, Worker} = require('worker_threads');

console.log(`Init ${threadId}`);

parentPort.on('message', (message) =>{
    const token = workerData.token;
    const id = Math.random();
    const chatId = workerData.chatId;
    const userId = workerData.userId;
    const fullName = workerData.fullName;
    const isEnabled = workerData.isEnabled;
    console.log(`Message from main in thread ${threadId}`);
});

