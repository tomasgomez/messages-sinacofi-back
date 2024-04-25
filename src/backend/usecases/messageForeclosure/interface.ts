
import { Filter } from "@/backend/entities/cuk/filter";
import { CUK } from "@/backend/entities/cuk/cuk";
import { ICUK } from "@/backend/entities/cuk/interface";
import { Message } from "@/backend/entities/message/message";

export interface MessageForeclosureUsecases {
    getMessageForeclosure(filter: Filter, count: string, offset: string): Promise<CUK[] | Error>;
    createForeclosure(cuk: CUK, message: Message): Promise < ICUK | Error >
}