import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';

export async function update(message: Message): Promise<Message | Error> {
    try {
        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        let includeDocument = false;

        if (message.status && message?.status?.length > 0 && message.id !== undefined) {
            prismaClient.status.createMany({
                data: message.status
            });
        }

        /* Filter out empty values from the message object */
        const dataToUpdate = Object.fromEntries(
            Object.entries(message).filter(([_, value]) => value !== '')
        );

        const { parameters, ...dataWithoutParameters } = dataToUpdate;

        /* Update the message */
        const updatedMessage = await prismaClient.message.update({
            where: {
                id: message.id
            },
            data: {
                ...dataWithoutParameters,
            },
            include: {
                documents: includeDocument,
                status: true,
                parameters: true
            }
        });



        // Get existing parameters for the message
        const existingParameters = updatedMessage.parameters;

        // Separate parameters into toUpdate and toCreate lists
        const toUpdate = message.parameters?.filter((p: any) => 
            existingParameters.some(ep => ep.name === p.name)
        ) || [];

        const toCreate = message.parameters?.filter((p: any) => 
            !existingParameters.some(ep => ep.name === p.name)
        ) || [];

        // Update existing parameters
        for (const parameter of toUpdate) {
            prismaClient.parameters.updateMany({
                where: {
                    messageId: updatedMessage.id,
                    name: parameter.name
                },
                data: {
                    value: parameter.value
                }
            });
        }

        // Create new parameters
        for (const parameter of toCreate) {
            prismaClient.parameters.create({
                data: {
                    name: parameter.name,
                    value: parameter.value,
                    messageId: updatedMessage.id,
                    priority: parameter.priority || 0,
                }
            });
        }

        return updatedMessage;
    } catch (error: any) {
        console.error('Error updating message:', error);
        return error;
    }
}
