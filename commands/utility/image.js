const { MessageAttachment } = require("discord.js"); 

module.exports = {
    name: "image",
    description: "send,image",
    execute(message) {
        const bar = new MessageAttachment('https://media.discordapp.net/attachments/867054254894874634/957829204005773363/BannerBar.jpeg')
                 message.channel.send(bar)
                 .then(() => {message.channel.send(`Xin chào <@${message.guild.owner}>`)})
                 .then(() => {message.channel.send(bar)})
        
    },
};
