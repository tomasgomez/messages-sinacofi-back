import {
    Message
} from "@/backend/entities/message/message";
import {
    PrismaClientWrapper
} from '../prismaWrapper';


export async function create(message: Message): Promise < Message | Error > {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        /* Empty message object */
        let messageData: Message = new Message();


        /* Include other attributes if they are provided */
        if (Object.keys(message).length > 1) {
            messageData = {
                ...message
            };
        }

        /* Create a new message */
        const newMessage = await prismaClient.message.create({
            data: messageData
        });

        return newMessage
    } catch (error: any) {
        console.error('Error creating message:', error);
        return error;
    }
}