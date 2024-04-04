
import { Message } from "@/backend/entities/message";

export interface MessageUsecases {
    getMessage(message: Message, count: string, offset: string): Promise<Message[] | null>;
    createMessage(message: Message): Promise<Message | null>;
    updateMessage(message: Message): Promise<Message | null>;
}