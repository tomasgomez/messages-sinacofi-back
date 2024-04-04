import { MessageRepository } from '../../interfaces/messageRepository';
import { Message } from '../../entities/message';
import { find } from './find';
import { create } from './create';
import { update } from './update';

export class PrismaMessageAdapter implements MessageRepository {
  // find message
  find = async(message: Message, count:string, offset: string): Promise<Message[] | null> => find(message, count, offset);
  
  // create message
  create = async(message: Message): Promise<Message | null> => create(message);
  
  // update message
  update = async(message: Message): Promise<Message | null> => update(message);

}
