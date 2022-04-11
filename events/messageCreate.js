const Config = require('../config.json');

module.exports = async (client, message) => {
	if (!message.guild || message.author.bot) return;
	const args = message.content.split(/\s+/g);
	let command = '';
	if (message.content.startsWith(Config.prefix)) {
		command = args
			.shift()
			.slice(Config.prefix.length)
			.toLowerCase();
	}

	if (command) {
		const commandFile =
			client.commands.get(command) ||
			client.commands.get(client.aliases.get(command));

		if (commandFile) {
			await commandFile.execute(client, message, args);
		}
	}

	// const handlers = [
	// ].map((p) => p.catch((err) => promiseErrorHandler(client, err)));

	// await Promise.all(handlers);
};