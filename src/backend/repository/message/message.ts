import { MessageRepository } from '../messageRepository';
import { Message } from '../../entities/message/message';
import { find } from './find';
import { create } from './create';
import { update } from './update';
import { deleteMessage } from '@/backend/repository/message/deleteMessage';
import { deleteMany } from '@/backend/repository/message/deleteMany';
import { FilterMessage } from '@/backend/entities/message/filter';
export class PrismaMessageAdapter implements MessageRepository {
  // find message
  find = async(
    filter: FilterMessage, 
    includeParameters: boolean,
    includeDocuments: boolean
  ): Promise<Message[] | Error> => find(
    filter,
    includeParameters,
    includeDocuments
  );
  
  // create message
  create = async(message: Message): Promise<Message | Error> => create(message);
  
  // update message
  update = async(message: Message): Promise<Message | Error> => update(message);

  // delete message
  delete = async(message: Message): Promise<Message | Error> => deleteMessage(message);
  
  // delete message
  deleteMany = async(message: Message): Promise<Message | Error> => deleteMany(message);

  // find by filter
  findBy = async(filter: FilterMessage): Promise<Message[] | Error> => {
    throw new Error('Method not implemented.');
  }

}
