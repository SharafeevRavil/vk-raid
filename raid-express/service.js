const { workerData, parentPort,threadId,Worker } = require('worker_threads')

parentPort.onmessage(() => {
    const token = workerData.token;
    const id = Math.random()
    const chatId = workerData.chatId;
    const userId = workerData.userId;
    const fullName = workerData.fullName;
    const isEnabled = workerData.isEnabled;
    console.log(`RUN ${threadId}`)
})



parentPort.postMessage(null)