import { MessageRepository } from '../../repository/messageRepository';
import { PrismaMessageAdapter as PrismaAdapter } from '../../repository/message/message';
import { Message } from '../../entities/message/message';
import { MessageUsecases } from '@/backend/usecases/message/interface';
import { getMessage } from './getMessage';
import { createMessage } from './createMessage';
import { updateMessage } from './updateMessage';
import { handleMessage } from './handleMessage';
import { FilterMessage } from '@/backend/entities/message/filter';


/*
    Message Usecases
*/
export class MessageUscase implements MessageUsecases  {
    constructor(private readonly messageRepository: MessageRepository) {} 
    
    // get message
    getMessage = async (filter: FilterMessage): Promise<Message[] | Error> => 
        getMessage(this.messageRepository, filter);
    
    // create message
    createMessage = async (message: Message): Promise<Message | Error> => 
        createMessage(this.messageRepository, message);
    
    // handle message
    handleMessage = async (message: Message): Promise<Message | Error> => 
        handleMessage(this.messageRepository, message);

    // update message
    updateMessage = async (message: Message): Promise<Message | Error> => 
        updateMessage(this.messageRepository, message);

  }

const messageRepository: MessageRepository = new PrismaAdapter();
export const messageUseCase: MessageUsecases = new MessageUscase(messageRepository); // Add it on the api layer