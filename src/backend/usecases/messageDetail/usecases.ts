import { MessageRepository } from "@/backend/interfaces/messageRepository";
import { PrismaMessageAdapter as PrismaAdapter } from '../../repository/message/message';
import { Message } from '../../entities/message/message';
import { MessageDetailUsecases } from "@/backend/interfaces/messageDetailUsecases";
import { getMessageDetail } from './getMessageDetail';

// Message Detail usecases
export class MessageDetailUsecase implements MessageDetailUsecases {
    constructor(private readonly messageRepository: MessageRepository) {}

    // get message detail
    getMessageDetail = async (message: Message, count: string, offset: string): Promise<Message[] | Error> =>
        getMessageDetail(this.messageRepository, message, count, offset)
}

const messageRepository: MessageRepository = new PrismaAdapter();
export const messageDetailUseCase = new MessageDetailUsecase(messageRepository); // Add it on the api layer


