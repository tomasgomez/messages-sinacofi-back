import { MessageRepository } from '../../interfaces/messageRepository';
import { Message } from '../../entities/message';

// Get message function
export async function getMessage(repository: MessageRepository, message: Message, count: string, offset: string): Promise<Message[] | Error> {
  try {
    return repository.find(message, false, count, offset);
    
  } catch (error:  any) {
    console.error('Error updating message:', error);
    return error;
  }
}


