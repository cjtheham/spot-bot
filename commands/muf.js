const { MessageEmbed } = require("discord.js");

module.exports.execute = async (client, message) => {
    const embed = new MessageEmbed()
        .setTitle('Maximum Usable Frequency')
        .setDescription(`${Date()} - data from KC2G`)
        .setImage('https://prop.kc2g.com/renders/current/mufd-normal-now.svg');
    return await message.channel.send({ embeds: [embed] })
};

module.exports.config = { 
    name: 'muf',
    aliases: ['muf'],
    description: 'Check the current MUF.',
    usage: ['muf']
};