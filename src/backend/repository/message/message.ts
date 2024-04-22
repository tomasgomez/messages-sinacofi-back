import { MessageRepository } from '../messageRepository';
import { Message } from '../../entities/message/message';
import { find } from './find';
import { create } from './create';
import { update } from './update';
import { duplicateMessage } from './duplicateMessage';
import { MessageFilter } from '@/backend/entities/message/filter';

export class PrismaMessageAdapter implements MessageRepository {
  // find message
  find = async(message: Message, detail: boolean, count:string, offset: string): Promise<Message[] | Error> => find(message, detail, count, offset);
  
  // create message
  create = async(message: Message): Promise<Message | Error> => create(message);
  
  // update message
  update = async(message: Message): Promise<Message | Error> => update(message);

  // duplicate message
  duplicateMessage = async(message: Message): Promise<Message | Error> => duplicateMessage(message);

  // find by filter
  findBy = async(filter: MessageFilter): Promise<Message[] | Error> => {
    throw new Error('Method not implemented.');
  }

}
