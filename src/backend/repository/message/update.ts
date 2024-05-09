import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';


export async function update(message: Message): Promise<Message | Error> {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        let includeDocument = false;

        /* Filter out empty values from the message object */
        const dataToUpdate = Object.fromEntries(
            Object.entries(message).filter(([_, value]) => value !== '')
        );

        if (message.documents && message.documents.length > 0) {
            includeDocument = true;
        }

        console.log('Data to update:', dataToUpdate);

        const parameters = dataToUpdate.parameters;

        delete dataToUpdate.parameters;



        /* Update the message */
        const updatedMessage = await prismaClient.message.update({
            where: {
                id: message.id
            },
            data: {
                ...dataToUpdate,
                parameters: {
                    updateMany: parameters.map((parameter:any) => ({
                        where: {
                            
                                messageId: message.id,
                                name: parameter.name
                            
                        },
                            data: {
                                value: parameter.value
                            }
                        
                        }
                    ))
                },
                documents: {
                    createMany: {
                        data: message.documents ?? []
                    }
                }
            },
            include: {
                documents: includeDocument
            }
        });

        return updatedMessage;
    } catch (error: any) {
        console.error('Error updating message:', error);
        return error;
    }
}