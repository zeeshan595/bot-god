import { Message } from 'discord.js';
import { Hello } from './hello';

export interface Skill {
    onMessage: (message: Message) => Promise<void>;
}

export const skills: Skill[] = [
    //an example hello skill
    new Hello(),
];
