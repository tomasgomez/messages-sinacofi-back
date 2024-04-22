
import { Message } from "@/backend/entities/message/message";

export interface MessageDetailUsecases {
    getMessageDetail(message: Message, count: string, offset: string): Promise<Message[] | Error>;
}