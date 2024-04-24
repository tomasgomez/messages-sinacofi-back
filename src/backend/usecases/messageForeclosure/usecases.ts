import { MessageRepository } from "@/backend/repository/messageRepository";
import { CUKRepository } from "@/backend/repository/cukRepository";
import { PrismaMessageAdapter as PrismaAdapter } from '../../repository/message/message';
import { PrismaCukAdapter as PrismaCukAdapter } from '../../repository/cuk/cuk';
import { MessageFilter } from '../../entities/message/filter';
import { Message } from '../../entities/message/message';
import { MessageForeclosureUsecases } from "./interface";
import { getMessageForeclosure } from './getMessageForeclosure';

// Message Detail usecases
export class MessageForeclosureUsecase implements MessageForeclosureUsecases {
    constructor(private readonly messageRepository: MessageRepository,
        private readonly cukRepository: CUKRepository
    ) {}

    // get message detail
    getMessageForeclosure = async (filter: MessageFilter): Promise<Message[] | Error> =>
        getMessageForeclosure(this.messageRepository, this.cukRepository, filter)
}

const messageRepository: MessageRepository = new PrismaAdapter();
const cukRepository: CUKRepository = new PrismaCukAdapter();
export const messageForeclosureUseCase = new MessageForeclosureUsecase(messageRepository, cukRepository);


