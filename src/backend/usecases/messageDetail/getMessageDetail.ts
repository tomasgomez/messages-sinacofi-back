import { MessageRepository } from '../../interfaces/messageRepository';
import { Message } from '../../entities/message';
  
export async function _getMessageDetail(repository: MessageRepository, message: Message, count: string, offset: string): Promise<Message[] | null> {
    try {
        var messageResponse = await repository.find(message, count, offset);
        return messageResponse;
    } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching messageDetail:', error);
        return null;
    }
}
  

