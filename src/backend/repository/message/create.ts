import {
    Message
} from "@/backend/entities/message/message";
import {
    PrismaClientWrapper
} from '../prismaWrapper';
import {
    handleNullValues
} from "@/backend/utils/functions";
import {
    Parameter
} from "@/backend/entities/message/parameter";
import { MessageStatus } from "@/backend/entities/message/status";
import { createData } from "@/backend/repository/message/presenter/createData";

async function create(message: Message): Promise < Message | Error > {
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
        const messageData = createData(message);

        let parameters: Parameter[] = [];

        if (message.parameters) {
            parameters = message.parameters;
        }

        // Create a new message with associated parameters and documents
        const newMessage = await prismaClient.message.create({
            data: {
                ...messageData,
                documents: {},
                status: {
                    create: {
                        id: message.status ?? MessageStatus.PREPARADO,
                    }
                },
                parameters: {
                    createMany: {
                        data: parameters
                    }
                },
                TSN: {
                    create: {
                        institutionCode: message.origin ?? '',
                    }
                },
                LSN: {
                    create: {
                        institutionCode: message.destination ?? '',
                        areaCode: message.originArea ?? '',
                    }
                },
                OSN: {
                    create: {
                        institutionCode: message.destination ?? '',
                    }
                },
                NSE: {
                    create: {
                        institutionCode: message.origin ?? '',
                        areaCode: message.originArea ?? '',
                    }
                },
                NSR: {
                    create: {
                        institutionCode: message.destination ?? '',
                        areaCode: message.destinationArea ?? '',
                    }
                },
                NSQ: {
                    create: {
                        institutionCode: message.destination ?? '',
                    }
                }
            }
        });


        // Handle null values in the created message
        handleNullValues(newMessage);

        return newMessage as Message;
    } catch (error: any) {
        console.error('Error creating message:', error);
        return new Error(error.message);
    }
}

export {
    create
};