import { MessageRepository } from "@/backend/repository/messageRepository";
import { CUKRepository } from "@/backend/repository/cukRepository";
import { PrismaMessageAdapter as PrismaAdapter } from '../../repository/message/message';
import { PrismaCukAdapter as PrismaCukAdapter } from '../../repository/cuk/cuk';
import { Filter } from '../../entities/global/filter';
import { Message } from '../../entities/message/message';
import { MessageForeclosureUsecases } from "./interface";
import { getMessageForeclosure } from './getMessageForeclosure';
import { createForeclosure } from './createForeclosure';
import { CUK } from '../../entities/cuk/cuk';
import { ICUK } from '../../entities/cuk/interface';

// Message Detail usecases
export class MessageForeclosureUsecase implements MessageForeclosureUsecases {
    constructor(private readonly messageRepository: MessageRepository,
        private readonly cukRepository: CUKRepository
    ) {}

    // get message detail
    getMessageForeclosure = async (filter: Filter): Promise<CUK[] | Error> =>
        getMessageForeclosure(this.messageRepository, this.cukRepository, filter)

    // create foreclosure
    createForeclosure = async (cuk: CUK, message: Message): Promise < ICUK | Error > => 
        createForeclosure(this.cukRepository, cuk, message)
}

const messageRepository: MessageRepository = new PrismaAdapter();
const cukRepository: CUKRepository = new PrismaCukAdapter();
export const messageForeclosureUseCase = new MessageForeclosureUsecase(messageRepository, cukRepository);


