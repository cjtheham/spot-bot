const { Client, Intents, Collection } = require("discord.js");
const fs = require('fs');
const HamCluster = require('ham-cluster');

const config = require('./config.json')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    const jsfile = files.filter((f) => f.split('.').pop() === 'js');
    if (jsfile.length <= 0) {
        return console.log('No events have been loaded!');
    }
    jsfile.forEach((file) => {
        const event = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
    })
});

client.commands = new Collection();
client.aliases = new Collection();

fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    const jsfile = files.filter((f) => f.split('.').pop() === 'js');
    if (jsfile.length <= 0) {
        return console.log('No commands have been loaded!');
    }
    jsfile.forEach((f) => {
        const pull = require(`./commands/${f}`);
		client.commands.set(pull.config.name, pull);
		pull.config.aliases.forEach((alias) => {
			client.aliases.set(alias, pull.config.name);
		});
    })
})

// Spot Watcher

const rbnSpots = new HamCluster(config.loginCall, {
    hostname: "telnet.reversebeacon.net",
    port: 7000,
    type: "rbn"
})

const ssbSpots = new HamCluster(config.loginCall, {
    hostname: "w0mu.net",
    port: 7373
})

rbnSpots.on('connected', ()=> {
    console.log("Connected!");
});

// rbnSpots.on('spot', spot => {
//     if (client.channels.cache.get(config.channelToMessage) === undefined) {
//         return console.log('Error! Channel ID in Config in likely invalid. Please verify!');
//     }
//     if (true) {
//         const embed = new MessageEmbed()
//             .setTitle(spot.dxCall + " spotted")
//             .setDescription(spot.dxCall + " spotted by " + spot.deCall + " on " + spot.freq + "kHz at " + spot.time)
//         client.channels.cache.get(config.channelToMessage).send({ embeds: [embed] })
//         console.log(embed)
//     }
// });

ssbSpots.on('connected', () => {
    console.log('connected!')
})

ssbSpots.on('spot', spot => {
    if (client.channels.cache.get(config.channelToMessage) === undefined) {
        return console.log('Error! Channel ID in Config in likely invalid. Please verify!');
    }
    if (true) {
        console.log(spot)
        const message = `${spot.dxCall} spotted by ${spot.deCall} on ${spot.freq} kHz at ${spot.time}`
        client.channels.cache.get(config.channelToMessage).send(message)
    }
})

client.login(config.token)
