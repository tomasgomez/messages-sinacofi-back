import { Message } from '../entities/message';

export interface MessageRepository {
    find(message: Message, count:string, offset: string): Promise<Message[] | null>
  }
  