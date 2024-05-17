import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';
import { getChileanTime } from "@/backend/utils/functions";
import { Prisma } from "@prisma/client";

async function duplicateMessage(message: Message): Promise<Message | Error> {
    const prisma = new PrismaClientWrapper();

    try {
        const prismaClient = prisma.getClient();
        // Start transaction
        const updatedMessage = await prismaClient.$transaction(async (tx) => {
            /* Fetch the existing message to duplicate */
            const existingMessage = await tx.message.findUnique({
                where: { id: message.id },
                include: {
                    parameters: true
                }
            });

            if (!existingMessage) {
                throw new Error("Message not found");
            }
            let newMessage: Partial<Message> = { ...existingMessage };

            interface PartialMessage extends Partial<Message> {
                [key: string]: any;
            }

            /* Remove multiple fields from the existing message */
            _attributesToExclude.forEach((attribute) => {
                if (newMessage.hasOwnProperty(attribute)) {
                    delete (newMessage as PartialMessage)[attribute];
                }
            });            

            /* Get the Chilean time */
            let chileanTime = getChileanTime()

            if (chileanTime instanceof Error) {
                return chileanTime;
            }

            let [date, time] = chileanTime;

            /* Set the creation date and time of the new message */
            newMessage.creationDate = date;
            newMessage.creationTime = time;

            newMessage.receivedDate = message.receivedDate;
            newMessage.receivedTime = message.receivedTime;


            const createArgs: Prisma.MessageCreateArgs = {
                data: {
                    ...newMessage,
                    parameters: {
                        createMany: {
                            data: existingMessage.parameters
                        }
                    },
                    documents: {
                        createMany: {
                            data: newMessage.documents || []
                        }
                    }                
                }
            }

            /* Create a duplicate message based on the fetched message with modifications */
            const duplicatedMessage = await tx.message.create(createArgs);

            return duplicatedMessage;
        });

        return updatedMessage;
    } catch (error: any) {
        console.error('Error updating message:', error);
        return error;
    }
}

const _attributesToExclude = ['id', 'TSN', 'OSN', 'NSE', 'actions', 'documents'];

export { duplicateMessage };