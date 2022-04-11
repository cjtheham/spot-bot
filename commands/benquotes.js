const benQuotes = [
    'do they sell containers of everything begle sezoning? i wood just eat that stuff hahahahuuuhhh',
    'sir?',
    '<:Bruh_What:946122821912911982>'
]

module.exports.config = { 
    name: 'benquotes',
    aliases: ['benjamin'],
    description: 'Ben says some dumb stuff.',
    usage: ['benQuotes']
};

module.exports.execute = async (client, message) => {
    return await message.channel.send(benQuotes[Math.floor(Math.random() * benQuotes.length)]);
};
