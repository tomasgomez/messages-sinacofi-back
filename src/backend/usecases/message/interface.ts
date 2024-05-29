
import { FilterMessage } from "@/backend/entities/message/filter";
import { Message } from "@/backend/entities/message/message";

export interface MessageUsecases {
    getMessage(filter: FilterMessage): Promise<Message[] | Error>;
    handleMessage(message: Message): Promise<Message | Error>;
    createMessage(message: Message): Promise<Message | Error>;
    updateMessage(message: Message): Promise<Message | Error>;
    signMessage(message: Message): Promise<Message | Error>;
}