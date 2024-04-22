import { MessageRepository } from '../../repository/messageRepository';
import { Message } from '../../entities/message/message';
import { MessageFilter } from '../../entities/message/filter';

// Get message function
export async function getMessageForeclosure(repository: MessageRepository, filter: MessageFilter ): Promise<Message[] | Error> {
  try {
    return repository.findBy(filter);
    
  } catch (error:  any) {
    console.error('Error updating message:', error);
    return error;
  }
}


