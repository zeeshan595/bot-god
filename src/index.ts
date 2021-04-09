import { Client } from 'discord.js';
import environment from './environment';
import { skills } from './skills';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let botId = '';
const bot = new Client();
bot.on('ready', () => {
    botId = bot.user.id;
    for (const skill of skills) {
        skill.onInit(bot);
    }
    console.log('Bot Ready');
});
bot.on('message', async message => {
    for (const skill of skills) {
        skill.onMessage(bot, message);
    }
});
bot.login(environment.BOT_TOKEN);
