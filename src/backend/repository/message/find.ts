import {
  Message
} from "@/backend/entities/message/message";
import {
  PrismaClientWrapper
} from '../prismaWrapper';

async function find(message: Partial<Message>, detail: boolean, count: string, offset: string): Promise<Message[] | Error> {
  try {
      let messages: Message[];

      const prisma = new PrismaClientWrapper();
      const prismaClient = prisma.getClient();

      // Initialize the where object with the provided attributes to search with
      const where: Partial<Message> = {};

      // Loop through the provided attributes and add them to the where object
      for (const key in message) {
          if (message[key as keyof Message] !== undefined) {
              where[key as keyof Message] = message[key as keyof Message];
          }
      }

      let select = {
          id: true,
          TSN: true,
          OSN: true,
          NSE: true,
          messageCode: true,
          description: true,
          priority: true,
          status: true,
          sender: true,
          creationDate: true,
          creationTime: true,
          receiver: true,
          receivedDate: true,
          receivedTime: true,
          actions: true,
          documents: true,
          parameters: detail
      }

      // If count is not present then find all message
      if (count === '0' || count === '') {
          messages = await prismaClient.message.findMany({
              where,
              select,
          });
      } else {
          messages = await prismaClient.message.findMany({
              where,
              select,
              take: parseInt(count),
              skip: parseInt(offset)
          });
      }

      // If the messages are not found, return an error
      if (messages.length === 0) {
          return new Error('Message not found');
      }

      if (!detail) {
          messages.forEach((message) => {
              message.parameters = [];
          });
      }

      return messages;

  } catch (error: any) {
      console.error('Error fetching message:', error);
      return error;
  }
}

export {
  find
};