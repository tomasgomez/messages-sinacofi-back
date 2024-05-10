
import { Filter } from "@/backend/entities/global/filter";
import { CUK } from "@/backend/entities/cuk/cuk";
import { ICUK } from "@/backend/entities/cuk/interface";
import { Message } from "@/backend/entities/message/message";

export interface MessageForeclosureUsecases {
    getMessageForeclosure(filter: Filter, count: string, offset: string): Promise<CUK[] | Error>;
    createForeclosure(cuk: CUK, message: Message): Promise < ICUK | Error >
    handleForeclosure(cuk: CUK, message: Message): Promise < ICUK | Message | Error >
    updateForeclosure(cuk: CUK, message: Message): Promise < ICUK | Error >
    normalization(cuk: CUK, message: Message): Promise < ICUK | Error >
}