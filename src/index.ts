import { Client } from 'discord.js';
import environment from './environment';
import { skills } from './skills';

let botId = '';
const bot = new Client();
bot.on('ready', () => {
    botId = bot.user.id;
    console.log('Bot Ready');
});
bot.on('message', async message => {
    skills.forEach(skill => {
        skill.onMessage(message);
    });
});
bot.login(environment.BOT_TOKEN);
