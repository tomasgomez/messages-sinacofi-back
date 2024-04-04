import { Message } from "@/backend/entities/message";
import { PrismaClientWrapper } from './client/prismaWrapper';


export async function create(message: Message): Promise<Message | null> {
    const prisma = new PrismaClientWrapper();
  
    const prismaClient = prisma.getClient();
    return null;
}