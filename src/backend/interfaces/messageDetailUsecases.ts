
import { Message } from "@/backend/entities/message";

export interface MessageDetailUsecases {
    getMessageDetail(message: Message, count: string, offset: string): Promise<Message[] | null>;
}