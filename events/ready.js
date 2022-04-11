module.exports = async (client) => {
    await client.user.setActivity('the chaos on 7.200 MHz.', { type: 'WATCHING' });
    console.log(`Bot running on ${client.guilds.cache.size} servers as ${client.user.username}`)
};