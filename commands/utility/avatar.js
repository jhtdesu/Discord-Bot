const Discord = require('discord.js');
module.exports = {
	name: 'avatar',
	description: 'Lấy Avatar của ai đó.',
	aliases: ['icon', 'pfp'],
	execute(message, args) {
		if (args[0]){
			const user = message.mentions.users.first();
			if (!user) return message.reply('Bạn phải ghi tên một người để có thể sử dụng lệnh.');
            
			const otherIconEmbed = new Discord.MessageEmbed()
			   .setColor('#21f0ff')
			   .setTitle(`Avatar của ${user.username}`)
			   .setImage(user.displayAvatarURL({ dynamic: true, format:"png",size:256 }))
			   .setTimestamp()
			   
			  return message.channel.send(otherIconEmbed).catch(err => console.log(err));
		}

		const myIconEmbed = new Discord.MessageEmbed()
		   .setColor('#0099ff')
		   .setTitle(`Avatar của ${message.author.username}`)
		   .setImage(message.author.displayAvatarURL({ dynamic: true, format:"png",size:256 }))
		   .setTimestamp()

		  return message.channel.send(myIconEmbed).catch(err => console.log(err));

    }
}	

