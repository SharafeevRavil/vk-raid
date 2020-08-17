const {VK} = require('vk-io');
const {Authorization} = require('@vk-io/authorization');

function getVK(token) {
    return new VK({
        authScope: '4098',
        token: token
    })
}

module.exports = {
    doAuth: async function (login, password) {
        const vk = new VK({
            authScope: '4096',

            login: login,
            password: password
        });
        const authorization = new Authorization(vk);

        const direct = authorization.androidApp();
        const authResponse = await direct.run();
        vk.setOptions({
            token: authResponse.token
        });

        return vk;
    },
    getChatId: async function (token, chatName) {
        let offset = 0;
        const count = 200;
        const limitPages = 50;

        while (true) {
            const vk = getVK(token)
            const chats = await vk.api.messages.getConversations({
                offset: offset,
                count: count,
            });
            const chat = chats.items.find(x =>
                typeof x.conversation.chat_settings !== 'undefined' &&
                x.conversation.chat_settings.title.includes(chatName));
            if (typeof chat !== 'undefined') {
                return chat.conversation.peer.id - 2000000000;
            }
            offset += count;

            if (offset / count > limitPages) {
                throw 'No chat found';
            }
        }
    },
    getUserId: async function (token) {
        const users = await getVK(token).api.users.get({});
        return users[0].id;
    },
    getFullName: async function (token) {
        const users = await getVK(token).api.users.get({});
        return users[0].first_name + ' ' + users[0].last_name;
    }
}
