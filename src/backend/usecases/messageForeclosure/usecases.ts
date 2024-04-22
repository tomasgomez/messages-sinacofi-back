import { MessageRepository } from "@/backend/repository/messageRepository";
import { PrismaMessageAdapter as PrismaAdapter } from '../../repository/message/message';
import { Message } from '../../entities/message/message';
import { MessageForeclosureUsecases } from "./interface";
import { getMessageForeclosure } from './getMessageForeclosure';

// Message Detail usecases
export class MessageForeclosureUsecase implements MessageForeclosureUsecases {
    constructor(private readonly messageRepository: MessageRepository) {}

    // get message detail
    getMessageForeclosure = async (message: Message, count: string, offset: string): Promise<Message[] | Error> =>
        getMessageForeclosure(this.messageRepository, message, count, offset)
}

const messageRepository: MessageRepository = new PrismaAdapter();
export const messageForeclosureUseCase = new MessageForeclosureUsecase(messageRepository);


