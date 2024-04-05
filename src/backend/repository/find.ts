import { Message } from "@/backend/entities/message";
import { PrismaClientWrapper } from '../entities/prismaWrapper';


export async function find(message: Message, count:string, offset: string): Promise<Message[] | Error> {
    try {
        let messages: Message[];
  
        const prisma = new PrismaClientWrapper();
  
        const prismaClient = prisma.getClient();
  
        /* Desctructure the attributes from Message entity */
        const {
          id,
          messageCode,
        } = message;
  
        /* Initialize the where object with the possible attributes to search with */
        const where: {
          id?: number;
          messageCode?: string;
        } = {};
  
        /* If the attributes are present, add them to the where object */
        if (id) where.id = id;
        if (messageCode) where.messageCode = messageCode;

        console.log('where', where);
  
        /* If count is not present then find all message */
        if (count === '0' || count === '') {
          messages = await prismaClient.message.findMany({
            where
          });
        } else {
          messages = await prismaClient.message.findMany({
            where,
            take: parseInt(count),
            skip: parseInt(offset)
          });
        }
  
        /* If the messages is not found, return an error */
        if (messages.length === 0) {
          return new Error('Message not found');
        } else {
          return messages;
        }

      } catch (error: any) {
  
        console.error('Error fetching message:', error);
        return error;
      }
}