
import { Message } from "@/backend/entities/message/message";

export interface MessageForeclosureUsecases {
    getMessageForeclosure(message: Message, count: string, offset: string): Promise<Message[] | Error>;
}