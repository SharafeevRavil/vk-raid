const workerService = require('./worker_service')



function infoResponse() {
    return {
        "count": workerService.vkClients.length,
        "isEnabled": workerService.isEnabled,
        "clients": workerService.vkClients.map(el => el.userId)
    }
}

function OKResponse() {
    return {
        "message": "OK"
    }
}

module.exports = {
    ok: OKResponse,
    info: infoResponse,
}