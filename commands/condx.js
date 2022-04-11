const { MessageEmbed } = require("discord.js");

module.exports.execute = async (client, message) => {
    const embed = new MessageEmbed()
        .setTitle('Current Solar Conditions')
        .setDescription(`${Date()} - data from N0NBH`)
        .setImage('https://www.hamqsl.com/solar101pic.php');
    return await message.channel.send({ embeds: [embed] })
};

module.exports.config = { 
    name: 'condx',
    aliases: ['cond', 'conditions', 'solar'],
    description: 'An example command to test functionality.',
    usage: ['condx']
};