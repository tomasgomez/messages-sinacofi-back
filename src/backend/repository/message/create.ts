import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';
import { handleNullValues } from "@/backend/utils/functions";

async function create(message: Message): Promise<Message | Error> {
    try {
        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        // Ensure message is not empty
        if (!message || Object.keys(message).length === 0) {
            console.error('No message data provided');
            return new Error('No message data provided');
        }

        // Handle setting time if the method exists
        if (message.setTime) {
            message.setTime();
        }

        // Prepare message data for Prisma create
        const messageData: Partial<Message> = {};
        for (const [key, value] of Object.entries(message)) {
            if (value !== undefined) {
                messageData[key as keyof Message] = value;
            }
        }

        // Create a new message with associated parameters and documents
        const newMessage = await prismaClient.message.create({
            data: {
                ...messageData,
                parameters: {
                    createMany: {
                        data: message.parameters || [],
                    },
                },
                documents: {
                    createMany: {
                        data: message.documents || [],
                    },
                },
            },
            include: {
                parameters: true,
                documents: true,
            },
        });

        if (!newMessage) {
            console.error('Error creating message');
            return new Error('Error creating message');
        }

        // Handle null values in the created message
        handleNullValues(newMessage);

        return newMessage as Message;
    } catch (error: any) {
        console.error('Error creating message:', error);
        return new Error(error.message);
    }
}

export { create };
