import { MessageRepository } from "@/backend/repository/messageRepository";
import { CUKRepository } from "@/backend/repository/cukRepository";
import { PrismaMessageAdapter as PrismaAdapter } from '../../repository/message/message';
import { PrismaCukAdapter as PrismaCukAdapter } from '../../repository/cuk/cuk';
import { Filter } from '../../entities/cuk/filter';
import { Message } from '../../entities/message/message';
import { MessageForeclosureUsecases } from "./interface";
import { getMessageForeclosure } from './getMessageForeclosure';
import { createForeclosure } from './createForeclosure';
import { CUK } from '../../entities/cuk/cuk';
import { updateForclosure } from "./updateForeclosure";
import { normalization } from "./normalization";
import { getMessageForeclosureAccepted } from "./getForeclosureDetailAccepted";
import { getMessageForeclosureRejected } from "./getForeclosureDetailRejected";
import { User } from "@/backend/entities/user/user";

// Message Detail usecases
export class MessageForeclosureUsecase implements MessageForeclosureUsecases {
    constructor(private readonly messageRepository: MessageRepository,
        private readonly cukRepository: CUKRepository
    ) {}

    // get message detail
    getMessageForeclosure = async (filter: Filter): Promise<CUK[] | Error> =>
        getMessageForeclosure(this.messageRepository, this.cukRepository, filter)

    getMessageForeclosureAccepted = async (filter: Filter): Promise<CUK[] | Error> =>
        getMessageForeclosureAccepted(this.messageRepository, this.cukRepository, filter)

    getMessageForeclosureRejected = async (filter: Filter): Promise<CUK[] | Error> =>
        getMessageForeclosureRejected(this.messageRepository, this.cukRepository, filter)

    // create foreclosure
    createForeclosure = async (cuk: CUK, message: Message): Promise < CUK | Error > => 
        createForeclosure(this.cukRepository, cuk, message)

    updateForeclosure = async (cuk: CUK, message: Message, user: User): Promise < CUK | Error > => 
        updateForclosure(this.cukRepository, this.messageRepository, cuk, message, user)

    normalization = async (cuk: CUK, message: Message): Promise < CUK | Error > =>
        normalization(this.cukRepository, cuk, message)
}

const messageRepository: MessageRepository = new PrismaAdapter();
const cukRepository: CUKRepository = new PrismaCukAdapter();
export const messageForeclosureUseCase = new MessageForeclosureUsecase(messageRepository, cukRepository);


