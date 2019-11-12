import { Message } from 'discord.js';
import { Skill } from '..';

export class Hello implements Skill {
    onMessage = async (message: Message): Promise<void> => {
        //get message contents
        const text = message.cleanContent;
        //make sure text is hello
        if (text !== 'Hello') return;
        //reply howdy
        message.reply('Howdy');
    };
}
