import { Message } from '../entities/message';

export interface MessageRepository {
    find(message: Message): Promise<Message[] | null>
  }
  