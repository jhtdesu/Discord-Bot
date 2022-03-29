const fs = require('fs');

module.exports = {
	name: 'reload',
	description: 'Hồi 1 lệnh',
	args: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`Không tồn tại lệnh có tên \`${commandName}\`, ${message.author}!`);
		}

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Lệnh \`${newCommand.name}\` đã được hồi!`);
		} catch (error) {
			console.error(error);
			message.channel.send(`Có lỗi khi hồi lệnh \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};