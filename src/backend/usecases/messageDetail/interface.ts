
import { Message } from "@/backend/entities/message/message";
import { FilterMessage } from "@/backend/entities/message/filter";

export interface MessageDetailUsecases {
    getMessageDetail(filter: FilterMessage): Promise<Message[] | Error>;
}