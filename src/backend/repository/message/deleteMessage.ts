import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';

async function deleteMessage(message: Message): Promise<Message | Error> {
    try {
        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        let where: any;

        if(message.id) {
            where = {
                id: message.id,
            };
        } else {
            return new Error('Message ID is required to delete a message');
        }
    
        const deletedMessage = await prismaClient.message.delete({
            where,
        });

        return deletedMessage;
    } catch (error: any) {
        console.error('Error deleting message:', error);
        return new Error(error.message);
    }
}

export { deleteMessage };
