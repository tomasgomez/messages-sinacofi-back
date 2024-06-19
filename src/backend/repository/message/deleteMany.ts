import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';

async function deleteMany(message: Message): Promise<Message | Error> {
    try {
        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        let where: any;

        if(message.id) {
            where = {
                id: message.id,
            };
        } else if (message.messageCode && message.cukCode) {
            where = {
                messageCode: message.messageCode,
                cukCode: message.cukCode,
            };
        }
    
        const deletedMessage = await prismaClient.message.deleteMany({
            where,
        });

        return deletedMessage;
    } catch (error: any) {
        console.error('Error deleting message:', error);
        return new Error(error.message);
    }
}

export { deleteMany };
