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
    FilterMessage
} from "@/backend/entities/message/filter";

async function find(filter: FilterMessage, detail: boolean): Promise < Message[] | Error > {
    try {
        let messages: Message[];

        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        // Initialize the where object with the provided attributes to search with
        const where: Partial < Message > = {};

        // Parse count and offset from filter
        let countAsInt = parseInt(filter.count ?? '0', 10);
        let offsetAsInt = parseInt(filter.offset ?? '0', 10);


        // Loop through the provided attributes and add them to the where object
        for (const key in filter) {
            if (Object.prototype.hasOwnProperty.call(filter, key) === false) {
                continue;
            }

            if (filter[key] !== undefined) {
                where[key as keyof Message] = filter[key] as any;
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
        };

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
            take: countAsInt > 0 ? countAsInt : 5,
            skip: offsetAsInt > 0 ? offsetAsInt : 0
        });

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