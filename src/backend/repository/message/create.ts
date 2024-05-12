import {
    Message
} from "@/backend/entities/message/message";
import {
    PrismaClientWrapper
} from '../prismaWrapper';
import {
    handleNullValues
} from "@/backend/utils/functions";

async function create(message: Message): Promise < Message | Error > {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        /* Empty message object */
        let messageData: Message = new Message();
        
        if (message.setTime) {
            message.setTime();
        }

        if (Object.keys(message).length > 0) {
            for (const [key, value] of Object.entries(message)) {
                if (value !== undefined && key in message) {
                    messageData[key as keyof Message] = value;
                }
            }
        } else {
            console.error('No message data provided');
            return new Error('No message data provided');
        }

        // print al params values
        console.log('Message parameters:', messageData.parameters);

        /* Create a new message */
        const newMessage = await prismaClient.message.create({
            data: {
              ...messageData,
              parameters: {
                createMany: {
                  data: messageData.parameters ?? [],
                }
              },
              documents: {
                createMany: {
                    data: messageData.documents ?? []
                }
              }
            },
            include: {
              parameters: true,
              documents: true 
            }
        });

        if (newMessage === null) {
            console.error('Error creating message');
            return new Error('Error creating message');
        }
        
        // Loop through each message and handle null values
        handleNullValues(message, false);

        return newMessage as Message;
    } catch (error: any) {
        console.error('Error creating message:', error);
        return error;
    }
}

export {
    create
};
