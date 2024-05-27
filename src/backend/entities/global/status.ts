import { Message } from '@/backend/entities/message/message';

export type Status = {
    id: string;
    name: string;

    messages: Message[];
}