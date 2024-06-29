import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';
import { Document } from '@/backend/entities/global/document';
import { Parameter } from '@/backend/entities/message/parameter';

export async function update(message: Message): Promise<Message | Error> {
    try {
        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        let documentsToUpdate: Document[] = [];

        if (message.status && message.id !== undefined && message.status.length > 0 && message.id !== '') {
            for (const status of message.status) {
                const existingStatus = await prismaClient.status.findUnique({
                    where: {
                        messageId_id: {
                            messageId: message.id,
                            id: status.id,
                        },
                    },
                });

                if (!existingStatus) {
                    await prismaClient.status.create({
                    data: status,
                    });
                }

            }
        }

        /* Filter out empty values from the message object */
        const dataToUpdate = Object.fromEntries(
            Object.entries(message).filter(([_, value]) => value !== '')
        );

        const { parameters, documents, statusCode, ...dataWithoutParameters } = dataToUpdate;

        if (message.documents && message.documents.length > 0) {
            documentsToUpdate = message.documents;
        }

        delete dataWithoutParameters.status;

        /* Update the message */
        const updatedMessage = await prismaClient.message.update({
            where: {
                id: message.id
            },
            data: {
                ...dataWithoutParameters,
                documents: {
                    createMany: {
                        data: documentsToUpdate 
                    }
                }
            },
            include: {
                documents: true,
                status: true,
                parameters: true,
                TSN: true,
                LSN: true,
                OSN: true,
                NSE: true,
                NSQ: true,
                NSR: true,
            }
        });

        // Get existing parameters for the message
        const existingParameters = updatedMessage.parameters;

        // Separate parameters into toUpdate and toCreate lists
        const toUpdate = message.parameters?.filter((p: any) => 
            existingParameters.some(ep => ep.name === p.name && ep.value !== p.value && p.value !== '')
        ) || [];

        const toCreate = message.parameters?.filter((p: any) => 
            !existingParameters.some(ep => ep.name === p.name)
        ) || [];
        
        // Update existing parameters
        for await (const parameter of toUpdate) {
            await prismaClient.parameters.update({
                where: {
                    messageId_name_priority: {
                        messageId: updatedMessage.id,
                        name: parameter.name,
                        priority: parameter.priority,
                    }
                },
                data: {
                    value: parameter.value
                }
            });
        }

        // Create new parameters
        let createManyParameters = toCreate.map((parameter: any) => {
            let createparameter: Parameter = {
                name: parameter.name,
                value: parameter.value,
                messageId: updatedMessage.id,
                priority: parameter.priority,
                displayValue: parameter.displayValue,
                label: parameter.label,
            }
            return createparameter;
        });
        
        let result = await prismaClient.parameters.createMany({
            data: createManyParameters as any
        });

        return updatedMessage;
    } catch (error: any) {
        console.error('Error updating message:', error);
        return error;
    }
}
