// This is the needed event to use the welcome!
client.on('guildMemberAdd', async newMember => {
    // IMPORTANT NOTE: Make Sure To Use async and rename bot to client or whatever name you have for your bot events!
    const welcomeChannel = newMember.guild.channels.cache.find(channel => channel.name === 'welcome')
    welcomeChannel.send('cc')


    
});