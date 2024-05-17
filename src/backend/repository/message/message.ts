import { MessageRepository } from '../messageRepository';
import { Message } from '../../entities/message/message';
import { find } from './find';
import { create } from './create';
import { update } from './update';
import { duplicateMessage } from './duplicateMessage';
import { FilterMessage } from '@/backend/entities/message/filter';
export class PrismaMessageAdapter implements MessageRepository {
  // find message
  find = async(filter: FilterMessage): Promise<Message[] | Error> => find(filter);
  
  // create message
  create = async(message: Message): Promise<Message | Error> => create(message);
  
  // update message
  update = async(message: Message): Promise<Message | Error> => update(message);

  // duplicate message
  duplicateMessage = async(message: Message): Promise<Message | Error> => duplicateMessage(message);

  // find by filter
  findBy = async(filter: FilterMessage): Promise<Message[] | Error> => {
    throw new Error('Method not implemented.');
  }

}
