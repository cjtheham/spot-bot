module.exports.execute = async (client, message) => {
    return await message.channel.send('Pong!');
};

module.exports.config = { 
    name: 'ping',
    aliases: ['pong'],
    description: 'An example command to test functionality.',
    usage: ['ping']
};