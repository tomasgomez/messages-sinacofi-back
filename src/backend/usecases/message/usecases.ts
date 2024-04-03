import { MessageRepository } from '../../interfaces/messageRepository';
import { PrismaMessageAdapter as PrismaAdapter } from '../../adapters/prisma/message';
import { Message } from '../../entities/message';
import { MessageUsecases } from '@/backend/interfaces/messageUsecases';
import { _getMessage } from './getMessage';

/*
    Message Usecases
*/
export class MessageUscases implements MessageUsecases  {
    constructor(private readonly messageRepository: MessageRepository) {} 
    
    // get message
    async getMessage(message: Message, count: string, offset: string): Promise<Message[] | null> {
      return _getMessage(messageRepository, message, count, offset)
    }
  }


const messageRepository: MessageRepository = new PrismaAdapter();
export const messageUseCase = new MessageUscases(messageRepository); // Add it on the api layer