const axios = require('axios');

class discord {
    constructor(token, channelID, guildID) {
        this.token = token;
        this.channelID = channelID;
        this.guildID = guildID
    };

    async info(userid) {
        const response = await axios.get(`https://discord.com/api/v9/users/${userid}/profile?type=popout&with_mutual_guilds=true&with_mutual_friends=true&with_mutual_friends_count=false&guild_id=${this.guildID}`, {
            headers: {
                'authorization': this.token
            }
        })

        return response.data
    }

    async GetChannelMessage(num) {
        if(num > 50) throw new Error('Message limt is 50');

        const response = await axios.get(`https://discord.com/api/v9/channels/${this.channelID}/messages?limit=${num}`, {
            headers: {
                'authorization': this.token
            }
        })
        return response.data.reverse();
    }

    async send(msg) {
        return await axios.post(`https://discord.com/api/v9/channels/${this.channelID}/messages`, 
            {
                content: msg,
                flags: 0,
                mobile_network_type: "unknown",
                nonce: await this.randomCreateNum(),
                tts: false
            },
            {
                headers: {
                    'authorization': this.token,
                }
            }
        ).then(() => {
            return true
        }).catch((err) => {
            return false
        })
    }

    async randomCreateNum() {
        return Math.floor(Math.random() * 10 ** 18) + 10 ** 18;
    }
}

module.exports = discord;