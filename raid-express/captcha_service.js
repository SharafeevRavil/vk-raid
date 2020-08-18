let aWss = null;
const captchaClients = new Map();


function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const init = async (expressWs) => {
    console.log("Starting captcha service...");
    aWss = expressWs.getWss('/ws/captcha');
    console.log("Captcha service started");
};

const addClient = async (client) => {
    const id = randomInteger(0, 1000000);
    captchaClients.set(id, client);
    return id;
};

const sendBroadcast = async (message) => {
    aWss.clients.forEach(function (client) {
        client.send(message);
    })
};

module.exports = {
    init: init,
    sendBroadcast: sendBroadcast,
    addClient: addClient
};
