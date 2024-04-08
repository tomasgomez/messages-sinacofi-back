import { MessageRepository } from '../interfaces/messageRepository';
import { Message } from '../entities/message';
import { find } from './find';
import { create } from './create';
import { update } from './update';

export class PrismaMessageAdapter implements MessageRepository {
  // find message
  find = async(message: Message, detail: boolean, count:string, offset: string): Promise<Message[] | Error> => find(message, detail, count, offset);
  
  // create message
  create = async(message: Message): Promise<Message | Error> => create(message);
  
  // update message
  update = async(message: Message): Promise<Message | Error> => update(message);

}
