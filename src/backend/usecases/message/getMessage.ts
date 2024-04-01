import { MessageRepository } from '../../interfaces/messageRepository';
import { PrismaMessageAdapter as PrismaAdapter } from '../../adapters/messageDatabase';
import { Message } from '../../entities/message';

export class GetMessage {
    constructor(private readonly messageRepository: MessageRepository) {} 
  
    async execute(message: Message, count: string, offset: string): Promise<Message[] | null> {
      try {
        var messageResponse = await this.messageRepository.find(message);
        return messageResponse;
      } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return null;
      }
    }
  }


const messageRepository: MessageRepository = new PrismaAdapter();
export const getMessageUseCase = new GetMessage(messageRepository); // Add it on the api layer