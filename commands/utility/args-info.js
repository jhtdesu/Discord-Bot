module.exports = {
	name: 'args-info',
	description: 'đọc chữ.',
	args: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Đánh vần: ${args}\nSố chữ: ${args.length}`);
	},
};