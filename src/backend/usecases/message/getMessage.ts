import { MessageRepository } from '../../interfaces/messageRepository';
import { Message } from '../../entities/message';

// Get message function
export async function getMessage(repository: MessageRepository, message: Message, count: string, offset: string): Promise<Message[] | null> {
  try {
    var messageResponse = await repository.find(message, count, offset);
    return messageResponse;
  } catch (error) {
    // Handle errors appropriately
    console.error('Error updating message:', error);
    return null;
  }
}


