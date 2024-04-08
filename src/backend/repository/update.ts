import { Message } from "@/backend/entities/message";
import { PrismaClientWrapper } from '../entities/prismaWrapper';


export async function update(message: Message): Promise<Message | Error> {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        /* Filter out empty values from the message object */
        const dataToUpdate = Object.fromEntries(
            Object.entries(message).filter(([_, value]) => value !== '')
        );

        /* Update the message */
        const updatedMessage = await prismaClient.message.update({
            where: {
                id: message.id
            },
            data: dataToUpdate
        });

        return updatedMessage;
    } catch (error: any) {
        console.error('Error updating message:', error);
        return error;
    }
}