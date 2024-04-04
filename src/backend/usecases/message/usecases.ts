import { MessageRepository } from '../../interfaces/messageRepository';
import { PrismaMessageAdapter as PrismaAdapter } from '../../adapters/prisma/message';
import { Message } from '../../entities/message';
import { MessageUsecases } from '@/backend/interfaces/messageUsecases';
import { getMessage } from './getMessage';
import { createMessage } from './createMessage';
import { updateMessage } from './updateMessage';


/*
    Message Usecases
*/
export class MessageUscase implements MessageUsecases  {
    constructor(private readonly messageRepository: MessageRepository) {} 
    
    // get message
    getMessage = async (message: Message, count: string, offset: string): Promise<Message[] | null> => 
        getMessage(this.messageRepository, message, count, offset)
    
    // create message
    createMessage = async (message: Message): Promise<Message | null> => 
        createMessage(this.messageRepository, message);

    // update message
    updateMessage = async (message: Message): Promise<Message | null> => 
        updateMessage(this.messageRepository, message);

    
  }

const messageRepository: MessageRepository = new PrismaAdapter();
export const messageUseCase: MessageUsecases = new MessageUscase(messageRepository); // Add it on the api layer