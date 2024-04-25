
import { Message } from "@/backend/entities/message/message";
import { CUK } from "@/backend/entities/cuk/cuk";
import { ICUK } from "@/backend/entities/cuk/interface";

export interface MessageForeclosureUsecases {
    getMessageForeclosure(message: Message, count: string, offset: string): Promise<Message[] | Error>;
    createForeclosure(cuk: CUK, message: Message): Promise < ICUK | Error >
}