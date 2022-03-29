const { prefix } = require('../../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Hiện thông tin về một lệnh.',
	aliases: ['lệnh'],
	usage: '[tên lệnh]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			const embed = new Discord.MessageEmbed()
            .setColor('#21f0ff')
	     .setTitle('Đây là danh sách các lệnh:')
	    	     .addFields(
		    { name: 'Vui', value: 'avatar \n server ', inline: true },
		    { name: 'Vớ Vẩn', value: 'ping \n beep \n reload', inline: true },
			{ name: 'Không Vớ Vẩn', value: 'kick \n prune', inline: true },
			{ name: '\u200B', value: `\nBạn có thể nhập \`${prefix}help [tên lệnh]\` để biết chi tiết hơn!`}
			)

         return message.channel.send({embed: embed})
          
      }

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('lệnh không tồn tại!');
		}

		data.push(`**Tên:** ${command.name}`);

		if (command.aliases) data.push(`**Họ:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Thông tin:** ${command.description}`);
		if (command.usage) data.push(`**Sử Dụng:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Thời Gian:** ${command.cooldown || 3} giây`);

		message.channel.send(data, { split: true });
	},
};