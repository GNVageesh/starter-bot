const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const { prefix, token } = require("./config.json");

const bot = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

bot.commands = new Collection();
const files = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));
for (const file of files) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.on("ready", () => console.log(`${bot.user.username} has joined!`));

bot.on("messageCreate", async (message) => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	else if (command === "ping") {
		bot.commands.get("ping").run(message, args);
	}
});

bot.login(token);
