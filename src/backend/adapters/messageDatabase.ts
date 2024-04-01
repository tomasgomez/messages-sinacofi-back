import { MessageRepository } from '../interfaces/messageRepository';
import { PrismaClient } from '@prisma/client'; //TODO: define prisma client
import { Message } from '../entities/message';

const prisma = new PrismaClient(); 

export class PrismaMessageAdapter implements MessageRepository {
  async find(message: Message): Promise<Message[] | null> {
    try {
      let messages: Message[] = [];
      let messagesResponse: any;

      const {
        id,
        messageCode,
        creationDate,
        status
      } = message;

      const where: {
        id ? : number;
        messageCode ? : string;
        creationDate ? : string;
        status ? : string;
      } = {};

      if (id) where.id = id;
      if (messageCode) where.messageCode = messageCode;
      if (creationDate) where.creationDate = creationDate;
      if (status) where.status = status;

      messagesResponse = await prisma.message.findMany({
        where
      });

      if (messages.length === 0) {
        return null;
      }

      return messages;
    } catch (error) {

      //TODO: Handle errors appropriately
      console.error('Error fetching message:', error);
      return null;
    }
  }
}
