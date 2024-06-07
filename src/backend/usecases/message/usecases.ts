import { MessageRepository } from '../../repository/messageRepository';
import { PrismaMessageAdapter as PrismaAdapter } from '../../repository/message/message';
import { Message } from '../../entities/message/message';
import { MessageUsecases } from '@/backend/usecases/message/interface';
import { getMessage } from './getMessage';
import { createMessage } from './createMessage';
import { updateMessage } from './updateMessage';
import { handleMessage } from './handleMessage';
import { findDocuments } from './findDocuments';
import { FilterMessage } from '@/backend/entities/message/filter';
import { signMessage } from './signMessage';
import { CUKRepository } from '@/backend/repository/cukRepository';
import { PrismaCukAdapter } from '@/backend/repository/cuk/cuk';


/*
    Message Usecases
*/
export class MessageUscase implements MessageUsecases  {
    constructor(private readonly messageRepository: MessageRepository, private readonly cukRepository: CUKRepository) {} 
    
    // get message
    getMessage = async (filter: FilterMessage): Promise<Message[] | Error> => 
        getMessage(this.messageRepository, filter);
    
    // create message
    createMessage = async (message: Message): Promise<Message | Error> => 
        createMessage(this.messageRepository, message);
    
    // handle message
    handleMessage = async (message: Message): Promise<Message | Error> => 
        handleMessage(this.messageRepository, this.cukRepository, message);

    // update message
    updateMessage = async (message: Message): Promise<Message | Error> => 
        updateMessage(this.messageRepository, message);

    // find documents
    findDocuments = async (message: Message): Promise<Message | Error> =>
        findDocuments(message);

    // sign message
    signMessage = async (message: Message): Promise<Message | Error> => 
        signMessage(this.messageRepository, this.cukRepository, message);
}

// message repository
const messageRepository: MessageRepository = new PrismaAdapter();
const cukRepository: CUKRepository = new PrismaCukAdapter();
export const messageUseCase: MessageUsecases = new MessageUscase(messageRepository, cukRepository); // Add it on the api layer
