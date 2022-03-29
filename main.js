const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { MessageAttachment } = require("discord.js"); 

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('ready', () => {
	console.log('Ready!');

});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('Tôi không thể thực hiện lệnh đó khi chat riêng!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('Bạn không có quyền thực hiện lệnh!');
		}
	}

	if (command.args && !args.length) {
		let reply = `Bạn chưa nhập gì cả, ${message.author}!`;

		if (command.usage) {
			reply += `\nChính xác phải là: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Xin đợi thêm ${timeLeft.toFixed(1)} giây nữa để dùng lệnh \`${command.name}\`.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Có lỗi khi thực hiện lệnh!');
	}
});

const bar = new MessageAttachment('https://media.discordapp.net/attachments/867054254894874634/957829204005773363/BannerBar.jpeg')

     client.on('guildMemberAdd', guildMember =>{
        let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Đang Xác Minh');
        guildMember.roles.add(welcomeRole);

		let msgEmbed = new Discord.MessageEmbed()
		.setColor('#21f0ff')
		.setTitle (`Xin Chào. `)
		.setAuthor (guildMember.user.tag)
		.setThumbnail (guildMember.user.avatarURL({ dynamic: true }))
		
	   	.addField('Bạn có thể đọc qua mục luật sau \nđó xác minh để có thể tương tác. ' ,'\u200b')	
        .setTimestamp()

			const welcomeChannel = guildMember.guild.channels.cache.find(channel => channel.name === 'welcome')
			welcomeChannel.send(msgEmbed)})
			

client.login(token);