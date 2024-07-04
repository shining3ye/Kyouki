const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (!message.guild) return;

    if (message.content.startsWith('!ban')) {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('You do not have permission to ban members.');
        }

        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.resolve(user);
            if (member) {
                try {
                    await member.ban();
                    message.reply(`${user.tag} was banned.`);
                } catch (err) {
                    message.reply('I was unable to ban the member.');
                    console.error(err);
                }
            } else {
                message.reply('That user isn\'t in this guild!');
            }
        } else {
            message.reply('You didn\'t mention the user to ban!');
        }
    }
});

client.login('your-bot-token');
