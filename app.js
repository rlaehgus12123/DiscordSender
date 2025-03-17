const discord = require('./module/discord');
const config = require('./config.json');

const roles = ['1348440020926857398', '1348440053818327142', '1348450137462145117', '1348450283604152381', '1312514757865111683'];
const messaged = [];

// resend
(async () => {
    const Discord = new discord(config.TOKEN, config.CHANNELID, config.GUILDID);
    const sends = async () => {
        const ChatData = await Discord.GetChannelMessage(50);
        const randomText = ChatData[Math.floor(Math.random() * ChatData.length)];
        const text = randomText.content
        const username = randomText.author.username
        const userinfo = await Discord.info(randomText.author.id)
        if(roles.some(item => userinfo.guild_member.roles.includes(item)) && /^[a-zA-Z0-9\s]+$/.test(text)) {
            if(messaged.includes(text)) return console.log(`❌ "${username}"이 발송한 메시지인 "${text}"를 재발송중 이미 발송한 메세지라 발송에 실패했습니다.`);
            if(text.length > 109) return console.log(`❌ "${username}"이 발송한 메시지인 "${text}"는 109글자 이상이라 발송이 취소되었습니다.`);
            const message = await Discord.send(text);
            if(message) {
                console.log(`✅ "${username}"이 발송한 메시지인 "${text}"를 재발송에 했습니다.!`);
                messaged.push(text);
                return;
            } else {
                console.log(`❌ "${username}"이 발송한 메시지인 "${text}"를 재발송중 알 수 없는 이유로 메세지 발송에 실패했습니다.`);
                messaged.push(text);
                return;
            };
        } else {
            console.log(`❌ "${username}"이 발송한 메시지인 "${text}"를 재발송중 해당 유저의 역할이 올바르지 않거나 또는 메세지에 특수문자가 있어 취소 됐습니다.`);
            messaged.push(text);
            return;
        }
    }
    await sends();
    setInterval(sends, 11 * 1000);
})();

//AI

// (async () => {
//     const Discord = new discord(config.TOKEN, config.CHANNELID, config.GUILDID);

//     const sends = async () => {
//         const ChatData = await Discord.GetChannelMessage(5);
//         //최근 10개를 로깅하고 나를 멘션한게 있으면 retry 해서 답변하기.
//         const formattedChat = ChatData.map(({ author, content }) => `${author.username}: ${content}`).join('\n');
//         const createText = await new chatgpt(formattedChat).createText();
//         if(messaged.includes(createText)) return console.log(`❌ "${createText}"은 이미 발송한 메세지라 전송이 취소 되었습니다.`);
//         const message = await Discord.send(createText);
//         if(message) {
//             console.log(`✅ "${createText}"를 성공적으로 발송했습니다.`);
//             messaged.push(createText);
//             return;
//         } else {
//             console.log(`❌ "${createText}"를 발송하는데 실패했습니다.`);
//             messaged.push(createText);
//             return;
//         };
//     }
//     await sends();
//     setInterval(sends, 11 * 1000);
// })();
