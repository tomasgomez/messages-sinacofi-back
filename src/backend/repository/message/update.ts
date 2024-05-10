import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';
import { updateMessage } from "@/backend/usecases/message/updateMessage";


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

        

        const filteredKeys = Object.keys(dataToUpdate).filter(key => {
            return key !== 'paramters' && key !== 'documents' && key !== 'id'; 
        });
        
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

            for (const parameter of paremtersTobeUpdated) {
                const x = parameters.find((p: any) => p.name === parameter.name);
                const pupdated = prismaClient.parameters.update({
                    where: {
                        internalId: parameter.internalId
                    },
                    data: {
                        value: x.value
                    }
                });
            }
        }

        return updatedMessage;
    } catch (error: any) {
        console.error('Error updating message:', error);
        return error;
    }
}