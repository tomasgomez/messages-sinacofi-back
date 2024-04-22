import { MessageRepository } from '../../repository/messageRepository';
import { Message } from '../../entities/message/message';

// Get message function
export async function getMessageForeclosure(repository: MessageRepository, message: Message, count: string, offset: string): Promise<Message[] | Error> {
  try {
    return repository.find(message, false, count, offset);
    
  } catch (error:  any) {
    console.error('Error updating message:', error);
    return error;
  }
}


