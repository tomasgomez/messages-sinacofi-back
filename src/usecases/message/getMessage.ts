import { MessageRepository } from '../../interfaces/messageRepository';
import { PrismaMessageAdapter as PrismaAdapter } from '../../adapters/messageDatabase';

export class GetMessage {
    constructor(private readonly messageRepository: MessageRepository) {} 
  
    async execute(messageId: string): Promise<Message | null> {
      try {
        const message = await this.messageRepository.findById(messageId);
        return message;
      } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return null;
      }
    }
  }


const messageRepository: MessageRepository = new PrismaAdapter();
const getMessageUseCase = new GetMessage(messageRepository); // Add it on the api layer