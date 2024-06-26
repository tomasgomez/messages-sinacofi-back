
import { Filter } from "@/backend/entities/cuk/filter";
import { CUK } from "@/backend/entities/cuk/cuk";
import { Message } from "@/backend/entities/message/message";
import { User } from "@/backend/entities/user/user";

export interface MessageForeclosureUsecases {
    getMessageForeclosure(filter: Filter, count: string, offset: string): Promise<CUK[] | Error>;
    createForeclosure(cuk: CUK, message: Message): Promise < CUK | Error >
    updateForeclosure(cuk: CUK, message: Message, user: User): Promise < CUK | Error >
    normalization(cuk: CUK, message: Message): Promise < CUK | Error >
}