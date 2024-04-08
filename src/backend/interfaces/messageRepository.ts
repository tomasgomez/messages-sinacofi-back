import { Message } from '../entities/message';

export interface MessageRepository {
    find(message: Message, detail: boolean, count:string, offset: string): Promise<Message[] | Error>
    create(message: Message): Promise<Message | Error>
    update(message: Message): Promise<Message | Error>
  }
  