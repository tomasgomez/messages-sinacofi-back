
import { Message } from "@/backend/entities/message";

export interface MessageUsecases {
    getMessage(message: Message, count: string, offset: string): Promise<Message[] | Error>;
    createMessage(message: Message): Promise<Message | Error>;
    updateMessage(message: Message): Promise<Message | Error>;
}