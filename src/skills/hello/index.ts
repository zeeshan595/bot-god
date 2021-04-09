import { Client, Message } from 'discord.js';
import { Skill } from '..';

export class Hello implements Skill {
    onInit = async (bot: Client): Promise<void> => {
        return new Promise(resolve => {
            resolve();
            const guild = bot.guilds.first();
            setInterval(() => {
                const generatedChannels = guild.channels.filter(c => c.name.startsWith('PRIVATE_'));
                for (const channel of generatedChannels.values()) {
                    let isUserConnected = false;
                    for (const member of guild.members.values()) {
                        if (member.voiceChannel === channel) {
                            isUserConnected = true;
                            break;
                        }
                    }
                    if (!isUserConnected) {
                        channel.delete();
                    }
                }
            }, 10 * 1000);
        });
    };

    onMessage = async (_: Client, message: Message): Promise<void> => {
        const text = message.cleanContent;
        if (text !== 'request private channel') return;
        const everyone = message.guild.roles.find(r => r.name === '@everyone');
        if (!everyone) {
            message.reply('There was an issue creating the private channel');
            return;
        }
        message.guild.createChannel(`PRIVATE_${message.member.displayName}`, {
            name: `PRIVATE_${message.member.displayName}`,
            topic: `PRIVATE_CHANNEL`,
            type: 'voice',
            permissionOverwrites: [
                {
                    id: everyone.id,
                    deny: 1049600,
                    denied: 1049600,
                },
                {
                    id: message.member,
                    allow: 4294967287,
                    allowed: 4294967287,
                },
            ],
        });
        message.reply(
            'I have setup a private channel for you, where you are an admin. These channels are removed every 10 minutes if they stay empty.',
        );
    };
}
