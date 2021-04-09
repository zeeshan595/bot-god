import { Client, Message } from 'discord.js';
import { Hello } from './hello';

export interface Skill {
    onInit: (bot: Client) => Promise<void>;
    onMessage: (bot: Client, message: Message) => Promise<void>;
}

export const skills: Skill[] = [
    //an example hello skill
    new Hello(),
];
