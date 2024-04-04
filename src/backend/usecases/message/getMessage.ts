import { MessageRepository } from '../../interfaces/messageRepository';
import { Message } from '../../entities/message';


export async function getMessage(repository: MessageRepository, message: Message, count: string, offset: string): Promise<Message[] | null> {
  try {
    var messageResponse = await repository.find(message, count, offset);
    return messageResponse;
  } catch (error) {
    // Handle errors appropriately
    console.error('Error fetching message:', error);
    return null;
  }
}


