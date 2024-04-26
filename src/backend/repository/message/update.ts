import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';


export async function update(message: Message): Promise<Message | Error> {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        /* Filter out empty values from the message object */
        const dataToUpdate = Object.fromEntries(
            Object.entries(message).filter(([_, value]) => value !== '')
        );

        console.log('Data to update:', dataToUpdate);

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