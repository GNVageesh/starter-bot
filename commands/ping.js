module.exports = {
	name: "ping",
	description: "A Ping command for the BOT",
	run(message, args) {
		message.channel.send("Pong");
	},
};
