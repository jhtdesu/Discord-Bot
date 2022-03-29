module.exports = {
	name: 'prune',
	description: 'Xóa chat.',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;
    if(message.member.roles.cache.has('869849561412276224')){ 
		if (isNaN(amount)) {
			return message.reply('Số không hợp lệ.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('Bạn cần nhập số từ 1 đến 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('Có lỗi khi xóa chat!');
		});
	} else {
		message.channel.send('Bạn không có quyền sử dụng lệnh này!')
	    }	
  },
};