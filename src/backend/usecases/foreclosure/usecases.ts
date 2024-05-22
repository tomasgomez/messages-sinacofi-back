import { MessageRepository } from "@/backend/repository/messageRepository";
import { CUKRepository } from "@/backend/repository/cukRepository";
import { PrismaMessageAdapter as PrismaAdapter } from '../../repository/message/message';
import { PrismaCukAdapter as PrismaCukAdapter } from '../../repository/cuk/cuk';
import { Filter } from '../../entities/cuk/filter';
import { Message } from '../../entities/message/message';
import { MessageForeclosureUsecases } from "./interface";
import { getMessageForeclosure } from './getMessageForeclosure';
import { createForeclosure } from './createForeclosure';
import { handleForeclosure } from './handleForeclosure';
import { CUK } from '../../entities/cuk/cuk';
import { updateForclosure } from "./updateForeclosure";
import { normalization } from "./normalization";

// Message Detail usecases
export class MessageForeclosureUsecase implements MessageForeclosureUsecases {
    constructor(private readonly messageRepository: MessageRepository,
        private readonly cukRepository: CUKRepository
    ) {}

    // get message detail
    getMessageForeclosure = async (filter: Filter): Promise<CUK[] | Error> =>
        getMessageForeclosure(this.messageRepository, this.cukRepository, filter)

    // create foreclosure
    createForeclosure = async (cuk: CUK, message: Message): Promise < CUK | Error > => 
        createForeclosure(this.cukRepository, cuk, message)

    handleForeclosure = async (cuk: CUK, message: Message): Promise < CUK | Message | Error > =>
        handleForeclosure(this.cukRepository,this.messageRepository , cuk, message)

    updateForeclosure = async (cuk: CUK, message: Message): Promise < CUK | Error > => 
        updateForclosure(this.cukRepository, this.messageRepository, cuk, message)

    normalization = async (cuk: CUK, message: Message): Promise < CUK | Error > =>
        normalization(this.cukRepository, cuk, message)
}

const messageRepository: MessageRepository = new PrismaAdapter();
const cukRepository: CUKRepository = new PrismaCukAdapter();
export const messageForeclosureUseCase = new MessageForeclosureUsecase(messageRepository, cukRepository);


