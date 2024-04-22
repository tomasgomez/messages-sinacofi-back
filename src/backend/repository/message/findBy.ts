import {
    Message
} from "@/backend/entities/message/message";
import {
    PrismaClientWrapper
} from '../prismaWrapper';
import {
    MessageFilter
} from "@/backend/entities/message/filter";

async function findBy(filter: MessageFilter): Promise < Message[] | Error > {
    try {
        let messages: Message[];

        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        // Initialize the where object with the provided attributes to search with
        const where: Partial < Message > = {};


        let select = { // TODO: this should come from the usecase
            id: true,
            TSN: true,
            OSN: true,
            NSE: true,
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
            actions: true,
            documents: true,
        }

        messages = await prismaClient.message.findMany({
            where,
            select,
            take: parseInt(filter.count ?? ''),
            skip: parseInt(filter.offset ?? '')
        });


        // If the messages are not found, return an error
        if (messages.length === 0) {
            return new Error('Message not found');
        }

        return messages;

    } catch (error: any) {
        console.error('Error fetching message:', error);
        return error;
    }
}

export {
    findBy
};