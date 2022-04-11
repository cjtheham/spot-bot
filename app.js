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

const regex = new RegExp(/^[AaWaKkNn][a-zA-Z]?[0-9][a-zA-Z]{1,3}$/);

const ssbSpots = new HamCluster(config.loginCall, {
    hostname: config.clusterIP,
    port: config.clusterPort
})

ssbSpots.on('connected', () => {
    console.log(`Connected to ${config.clusterIP}`)
})

let message, comments;

ssbSpots.on('spot', spot => {
    if (client.channels.cache.get(config.channelToMessage) === undefined) {
        return console.log('Error! Channel ID in Config in likely invalid. Please verify!');
    }
    // only show spots from US to not US
    if (regex.test(spot.deCall) && regex.test(spot.dxCall) != true) {
        if (spot.comments != '') {
            comments = '`' + spot.comments + '`';
        } else { comments = '' }
        console.log(spot)
        if (config.callsToWatch.includes(spot.dxCall)) {
            message = `***!!! SPECIAL SPOT !!!*** \n ${spot.dxCall} spotted by ${spot.deCall} on ${spot.freq} kHz at ${spot.time} \n \`${spot.comments}\``
            client.channels.cache.get(config.channelToMessage).send(message)
        } if (true) { 
            message = `${spot.dxCall} spotted by ${spot.deCall} on ${spot.freq} kHz at ${spot.time} \n${comments}`
            client.channels.cache.get(config.channelToMessage).send(message)
        }
    }
})

client.login(config.token)
