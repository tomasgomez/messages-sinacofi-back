import { MessageRepository } from '../interfaces/messageRepository';
import { PrismaClient } from '@prisma/client'; //TODO: define prisma client

const prisma = new PrismaClient(); 

export class PrismaMessageAdapter implements MessageRepository {
  async findById(id: string): Promise<Message | null> {
    try {
      
      /* Find a message by their ID */
      const message = await prisma.message.findUnique({ where: { id } }); 

      return message;
    } catch (error) {

      //TODO: Handle errors appropriately
      console.error('Error fetching message:', error);
      return null;
    }
  }
}
