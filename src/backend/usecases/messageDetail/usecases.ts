import { MessageRepository } from "@/backend/interfaces/messageRepository";
import { PrismaMessageAdapter as PrismaAdapter } from '../../adapters/prisma/message';
import { Message } from '../../entities/message';
import { MessageDetailUsecases } from "@/backend/interfaces/messageDetailUsecases";
import { _getMessageDetail } from './getMessageDetail';

// Message Detail usecases
export class MessageDetail implements MessageDetailUsecases {
    constructor(private readonly messageRepository: MessageRepository) {}

    // get message detail
    async getMessageDetail(message: Message, count: string, offset: string): Promise<Message[] | null> {
        return _getMessageDetail(messageRepository, message, count, offset)
    } 
}

const messageRepository: MessageRepository = new PrismaAdapter();
export const messageDetailUseCase = new MessageDetail(messageRepository); // Add it on the api layer