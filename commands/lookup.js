const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");

let address, last_lotw;

module.exports.execute = async (client, message, args) => {
    if (args.length) {
        axios.get(`https://hamcall.dev/${args[0]}.json`)
            .then(function (response) {
                if (response.data.address == '') {
                    address = `P.O. BOX ${response.data.po_box}` 
                } else {
                    address = response.data.address
                }
                if (response.data.last_lotw == '') {
                    last_lotw = "never"
                } else {
                    last_lotw = response.data.last_lotw
                }
                const embed = new MessageEmbed()
                    .setColor('#b19cd9')
                    .setTitle(`${response.data.callsign}`)
                    .addFields(
                        {name: 'Name', value: response.data.name},
                        {name: 'Address', value: `${address} \n ${response.data.city}, ${response.data.state} ${response.data.zip}`},
                        {name: 'Expires', value: response.data.expiration},
                        {name: 'LOTW Upload', value: last_lotw }
                    )
                return message.channel.send({ embeds: [ embed ] })
            })
            .catch(function (error) {
                return message.channel.send('no bueno por favor')
            })
    } else {
        return await message.channel.send('Please give me a callsign to search for.')
    }
};

module.exports.config = { 
    name: 'lookup',
    aliases: ['uls'],
    description: 'Searches FCC DB for a callsign.',
    usage: ['lookup <callsign>']
};