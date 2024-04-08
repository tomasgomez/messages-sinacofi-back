import { MessageRepository } from '../../interfaces/messageRepository';
import { PrismaMessageAdapter as PrismaAdapter } from '../../repository/message';
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
    getMessage = async (message: Message, count: string, offset: string): Promise<Message[] | Error> => 
        getMessage(this.messageRepository, message, count, offset)
    
    // create message
    createMessage = async (message: Message): Promise<Message | Error> => 
        createMessage(this.messageRepository, message);

    // update message
    updateMessage = async (message: Message): Promise<Message | Error> => 
        updateMessage(this.messageRepository, message);

    
  }

const messageRepository: MessageRepository = new PrismaAdapter();
export const messageUseCase: MessageUsecases = new MessageUscase(messageRepository); // Add it on the api layer