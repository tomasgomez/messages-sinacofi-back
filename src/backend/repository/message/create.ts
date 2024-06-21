import {
    Message
} from "@/backend/entities/message/message";
import {
    PrismaClientWrapper
} from '../prismaWrapper';
import {
    handleNullValues
} from "@/backend/utils/functions";
import { MessageStatus } from "@/backend/entities/message/status";
import { createData } from "@/backend/repository/message/presenter/createData"; 
import { Parameter } from "@/backend/entities/message/parameter";

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

        let status = message.statusCode ?? MessageStatus.PREPARADO;
        // Prepare message data for Prisma create
        const messageData = createData(message);

        // Create a new message with associated parameters and documents
        const updatedMessage = await prismaClient.message.create({
            data: {
                ...messageData,
                documents: {},
                status: {
                    create: {
                        id: status,
                    }
                },
                parameters: {
                    createMany: {
                        data: messageData?.parameters ?? [],
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
            },
            include: {
                TSN: true,
                LSN: true,
                OSN: true,
                NSE: true,
                NSR: true,
                NSQ: true,
                status: true,
            }
        });

        // TODO: FIX please correlative
        // let correlativesParams: Parameter[] = [
        //     {
        //         name:"OSN",
        //         label: "OSN",
        //         priority: 19,
        //         value: newMessage.OSN?.id.toString(),
        //         cukCode: newMessage.cukCode ?? null,
        //         messageCode: newMessage.messageCode
        //     },
        //     {
        //         name:"TSN",
        //         label: "TSN",
        //         priority: 0,
        //         value: newMessage.TSN?.id.toString(),
        //         cukCode: newMessage.cukCode ?? null,
        //         messageCode: newMessage.messageCode
        //     },
        //     {
        //         name:"NSE",
        //         label: "NSE",
        //         priority: 0,
        //         value: newMessage.NSE?.id.toString(),
        //         cukCode: newMessage.cukCode ?? null,
        //         messageCode: newMessage.messageCode
        //     }
        // ]

        // const updatedMessage = await prismaClient.message.update({
        //     where: {
        //       id: newMessage.id
        //     },
        //     data: {
        //       parameters: {
        //         createMany: {
        //           data: correlativesParams
        //         }
        //       }
        //     },
        //     include: {
        //     //   parameters: true,
        //           TSN: true,
        //         LSN: true,
        //         OSN: true,
        //         NSE: true,
        //         NSR: true,
        //         NSQ: true,
        //         status: true,
        //     }
        // });
       


        // Handle null values in the created message
        handleNullValues(updatedMessage);

        return updatedMessage as Message;
    } catch (error: any) {
        console.error('Error creating message:', error);
        return new Error(error.message);
    }
}

export {
    create
};