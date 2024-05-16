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
                
        const { parameters, ...dataWithOutParemters } = dataToUpdate;
        

        /* Update the message */
        const updatedMessage = await prismaClient.message.update({
            where: {
                id: message.id
            },
            data: {
                ...dataWithOutParemters,
                documents: {
                    createMany: {
                        data: message.documents ?? []
                    }
                }
            },
            include: {
                documents: includeDocument,
                parameters: true
            }
        });
        // update parameters
        if (parameters) {
            const paremtersTobeUpdated = updatedMessage.parameters;

            let counting = 0;
            for (const parameter of paremtersTobeUpdated) {
                const toUpdate = parameters.find((p: any) => p.name === parameter.name);
                const toCreate = parameters.find((p: any) => p.name !== parameter.name);

                await prismaClient.parameters.upsert({
                    where: {
                        internalId: parameter.internalId
                    },
                    update: {
                        value: toUpdate.value
                    },
                    create: {
                        id: toCreate.name,
                        name: toCreate.name,
                        value: toCreate.value,
                        messageId: updatedMessage.id,
                        priority: counting,
                    }
                });
                counting++;
            }
        }

        return updatedMessage;
    } catch (error: any) {
        console.error('Error updating message:', error);
        return error;
    }
}