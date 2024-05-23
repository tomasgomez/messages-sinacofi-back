import { MessageRepository } from '../../repository/messageRepository';
import { Message } from '../../entities/message/message';
import { FilterMessage } from '@/backend/entities/message/filter';

// Get message function
export async function getMessage(repository: MessageRepository, filter: FilterMessage): Promise<Message[] | Error> {
  try {
    return await repository.find(filter);
    
  } catch (error:  any) {
    console.error('Error updating message:', error);
    return error;
  }
}