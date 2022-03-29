module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them (but not really).',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('Bạn cần ghi tên một người để kick họ!');
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`Bạn muốn kick ${taggedUser.username}?`);
	},
};