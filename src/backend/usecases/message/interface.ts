
import { FilterMessage } from "@/backend/entities/message/filter";
import { Message } from "@/backend/entities/message/message";
import { User } from "@/backend/entities/user/user";

export interface MessageUsecases {
    getMessage(filter: FilterMessage): Promise<Message[] | Error>;
    handleMessage(message: Message, user: User): Promise<Message | Error>;
    createMessage(message: Message, user: User): Promise<Message | Error>;
    updateMessage(message: Message, user?: User ): Promise<Message | Error>;
    findDocuments(message: Message): Promise<Message | Error>;
    signMessage(message: Message, dni: string, name: string, user: User): Promise<Message | Error>;
}