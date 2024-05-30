import { MessageRepository } from "@/backend/repository/messageRepository";
import { PrismaMessageAdapter as PrismaAdapter } from '../../repository/message/message';
import { Message } from '../../entities/message/message';
import { MessageDetailUsecases } from "@/backend/usecases/messageDetail/interface";
import { getMessageDetail } from './getMessageDetail';
import { FilterMessage } from "@/backend/entities/message/filter";

// Message Detail usecases
export class MessageDetailUsecase implements MessageDetailUsecases {
    constructor(private readonly messageRepository: MessageRepository) {}

    // get message detail
    getMessageDetail = async (filter: FilterMessage): Promise<Message[] | Error> =>
        getMessageDetail(this.messageRepository, filter)
}

const messageRepository: MessageRepository = new PrismaAdapter();
export const messageDetailUseCase = new MessageDetailUsecase(messageRepository);


