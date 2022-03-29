const Discord = require('discord.js');
module.exports = {
	name: 'server',
	description: 'Hiện thông tin của server.',
	execute(message) {
		const exampleEmbed = new Discord.MessageEmbed()
	        .setColor('#21f0ff')
	        .setTitle(message.guild.name)
        	.setDescription('Thông tin của server')
	        .setThumbnail(`${message.guild.iconURL()}`)
        	.addFields(
 		        { name: 'Quốc Gia', value :'Việt Nam'},
				{ name: 'Tổng thành viên', value: `${message.guild.memberCount}` },
				{ name: 'Chủ server', value: `${message.guild.owner}`},
            	)
	        .setTimestamp()
	
		message.channel.send(exampleEmbed);
	},
};