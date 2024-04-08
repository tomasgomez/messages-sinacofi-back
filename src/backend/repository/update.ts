import { Message } from "@/backend/entities/message";
import { PrismaClientWrapper } from '../entities/prismaWrapper';


export async function update(message: Message): Promise<Message | Error> {
    const prisma = new PrismaClientWrapper();
  
    const prismaClient = prisma.getClient();
    return Error('Not implemented');
}