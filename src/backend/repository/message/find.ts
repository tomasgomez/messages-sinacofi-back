import {
  Message
} from "@/backend/entities/message/message";
import {
  PrismaClientWrapper
} from '../prismaWrapper';


export async function find(message: Message, detail: boolean, count: string, offset: string): Promise < Message[] | Error > {
  try {
    let messages: Message[];

    const prisma = new PrismaClientWrapper();

    const prismaClient = prisma.getClient();

    /* Desctructure the attributes from Message entity */
    const {
      id,
      messageCode,
      status,
    } = message;

    /* Initialize the where object with the possible attributes to search with */
    const where: {
      id ? : number;
      messageCode ? : string;
      status ? : string;
      sender ? : string;
    } = {};

    /* If the attributes are present, add them to the where object */
    if (id) where.id = id;
    if (messageCode) where.messageCode = messageCode;
    if (status) where.status = status;

    let select = {
      id: true,
      TSN: true,
      OSN: true,
      NSE: true,
      messageCode: true,
      destination: true,
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

    /* If count is not present then find all message */
    if (count === '0' || count === '') {
      messages = await prismaClient.message.findMany({
        where,
        select: select,
      });
    } else {
      messages = await prismaClient.message.findMany({
        where,
        select: select,
        take: parseInt(count),
        skip: parseInt(offset)
      });
    }

    /* If the messages is not found, return an error */
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