import {
    Message
} from "@/backend/entities/message/message";
import {
    PrismaClientWrapper
} from '../prismaWrapper';
import {
    handleNullValues
} from "@/backend/utils/functions";

async function find(message: Partial < Message > , detail: boolean, count: string, offset: string): Promise < Message[] | Error > {
    try {
        let messages: Message[];

        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        // Initialize the where object with the provided attributes to search with
        const where: Partial < Message > = {};

        // Loop through the provided attributes and add them to the where object
        for (const key in message) {
            if (message[key as keyof Message] !== undefined) {
                where[key as keyof Message] = message[key as keyof Message];
            }
        }

        let select = { // TODO: this should come from the usecase
            id: true,
            TSN: true,
            OSN: true,
            NSE: true,
            LSN: true,
            NSR: true,
            messageCode: true,
            description: true,
            priority: true,
            status: true,
            sender: true,
            creationDate: true,
            creationTime: true,
            receiver: true,
            receivedDate: true,
            receivedTime: true,
            cukCode: true,
            actions: true,
            documents: true,
            parameters: detail
        }

        // If count is not present then find all message
        if (count === '0' || count === '' || offset === '' || offset === '0') {
            console.log("where1", where);
            messages = await prismaClient.message.findMany({
                where: {
                    ...where,
                    documents: {},
                    parameters: {}
                },
                select,
                orderBy: {
                    creationDate: 'desc'
                },
                take: parseInt("5"),
                skip: parseInt("0")
            });
        } else {
            console.log("where2", where);
            messages = await prismaClient.message.findMany({
                where: {
                    ...where,
                    documents: {},
                    parameters: {}
                },
                select,
                orderBy: {
                    creationDate: 'desc'
                },
                take: parseInt(count),
                skip: parseInt(offset)
            });
        }

        // If the messages are not found, return an error
        if (messages.length === 0) {
            return new Error('Message not found');
        }

        // Loop through each message and handle null values
        messages.forEach(message => {
            handleNullValues(message, detail);
        });

        return messages;

    } catch (error: any) {
        console.error('Error fetching message:', error);
        return error;
    }
}

export {
    find
};