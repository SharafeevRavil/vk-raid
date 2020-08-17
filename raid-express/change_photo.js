const checkPhotoDeleted = async (vk, chatId, userId) => {
    const messages = await vk.api.messages.getHistory({
        count: 1,
        peer_id: chatId + 2000000000
    });
    return typeof messages.items[0].action !== 'undefined' &&
        (messages.items[0].action.type === 'chat_photo_remove' ||
            messages.items[0].action.type === 'chat_photo_update' && messages.items[0].from_id !== userId);
}

const uploadPhoto = async (vk, chatId) => {
    await vk.upload.chatPhoto({
        source: './JQbpFFLW1NE.jpg',
        chat_id: chatId
    });
}

const beautifyDateTime = (dateTime) => {
    let d = dateTime.getDate();
    d = d >= 10 ? d : `0${d}`;
    let M = dateTime.getMonth();
    M = M >= 10 ? M : `0${M}`;
    let y = dateTime.getFullYear() % 100;
    y = y >= 10 ? y : `0${y}`;
    let h = dateTime.getHours();
    h = h >= 10 ? h : `0${h}`;
    let m = dateTime.getMinutes();
    m = m >= 10 ? m : `0${m}`;
    let s = dateTime.getSeconds();
    s = s >= 10 ? s : `0${s}`;
    let ms = dateTime.getMilliseconds();
    ms = ms >= 100 ? ms : ms >= 10 ? `0${ms}` : `00${ms}`;
    return `[${d}.${M}.${y}|${h}:${m}:${s}.${ms}]`;
}

const main = async () => {

    while (true) {
        const nowStr = beautifyDateTime(new Date());
        const photoDeleted = await checkPhotoDeleted(vk, chatId, userId);
        if (photoDeleted) {
            await uploadPhoto(vk, chatId);
            console.log(`${nowStr} Фото было удалено.`);
        } else {
            console.log(`${nowStr} Все в порядке.`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}