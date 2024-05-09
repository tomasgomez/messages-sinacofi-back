import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';
import { MessageStatus } from "@/backend/entities/message/status";
import { getChileanTime } from "@/backend/utils/functions";

export async function duplicateMessage(message: Message): Promise<Message | Error> {
    const prisma = new PrismaClientWrapper();

    try {
        const prismaClient = prisma.getClient();

        // Start transaction
        const updatedMessage = await prismaClient.$transaction(async (tx) => {
            /* Fetch the existing message to duplicate */
            const existingMessage = await tx.message.findUnique({
                where: { id: message.id }
            });

            if (!existingMessage || existingMessage !instanceof Message) {
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

            delete newMessage.LSN;
            delete newMessage.NSE;
            delete newMessage.TSN;
            delete newMessage.OSN;
            delete newMessage.NSQ;
            delete newMessage.NSR;
            

            /* Set the status of the new message to ENVIADO */
            newMessage.status = MessageStatus.BANDEJA_DE_ENTRADA;

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

            /* Create a duplicate message based on the fetched message with modifications */
            const duplicatedMessage = await tx.message.create({
                data: {
                    ...newMessage,
                    documents: {
                        createMany: {
                            data: newMessage.documents || []
                        }
                    },
                    parameters: {
                        createMany: {
                            data: newMessage.parameters || []
                        }
                    },
                }
            });

            return duplicatedMessage;
        });

        return updatedMessage;
    } catch (error: any) {
        console.error('Error updating message:', error);
        return error;
    }
}

const _attributesToExclude = ['id', 'TSN', 'OSN', 'NSE', 'actions', 'documents'];