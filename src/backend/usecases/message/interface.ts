
import { Message } from "@/backend/entities/message/message";

export interface MessageUsecases {
    getMessage(message: Message, count: string, offset: string): Promise<Message[] | Error>;
    handleMessage(message: Message): Promise<Message | Error>;
    createMessage(message: Message): Promise<Message | Error>;
    updateMessage(message: Message): Promise<Message | Error>;
}