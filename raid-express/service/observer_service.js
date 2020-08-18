const {isMainThread, parentPort, workerData, threadId, Worker} = require('worker_threads');
const {VK} = require('vk-io');
const {HearManager} = require('@vk-io/hear');

const hearManager = new HearManager();
const knownUsers = new Map();

const fs = require('fs');

const vk = new VK({
    token: workerData.token
});

vk.updates.on('new_message', hearManager.middleware);

hearManager.hear(/^.*/i, async (context) => {
    if ((context.peerId - 2000000000) === workerData.chatId) {
        let value = knownUsers.get(context.senderId);
        if (value === undefined) {
            let user = await vk.api.users.get({
                user_ids: [context.senderId]
            }).then(users => users[0]);
            value = `${context.senderId}: ${user.first_name} ${user.last_name}`;
            knownUsers.set(context.senderId, value)
        }
        logToFile(value + ": " + context.text)
        //add another output
    }
});


console.log(`Init ${threadId}`);
vk.updates.start().catch(console.error);


function logToFile(msg) {
    fs.writeFile('./chat_dump/log.txt', msg, (error) => {
        if (error) throw error;
    })
}
