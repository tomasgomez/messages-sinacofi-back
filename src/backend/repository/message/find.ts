import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';
import { handleNullValues } from "@/backend/utils/functions";
import { FilterMessage } from "@/backend/entities/message/filter";

async function find(filter: FilterMessage): Promise<Message[] | Error> {
    try {
        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        // Initialize the where object with the provided attributes to search with
        const where: Partial<Message> = {};

        // Parse count and offset from filter
        const countAsInt = parseInt(filter.count ?? '0', 10);
        const offsetAsInt = parseInt(filter.offset ?? '0', 10);

        // Loop through the provided attributes and add them to the where object
        for (const key in filter) {
            if (Object.hasOwn(filter, key)) {
                const value = filter[key as keyof FilterMessage];
                if (value !== undefined) {
                    where[key as keyof Message] = value as any;
                }
            }
        }

        const messages = await prismaClient.message.findMany({
            where: {
                ...where,
                // Ensure documents and parameters are included in the where clause if needed
                documents: filter.documents ? { some: {...filter.documents }} : undefined,
                parameters: {}
                // parameters: filter.parameters ? { some: {...filter.parameters.map(param => )} } : undefined,
            },
            orderBy: {
                creationDate: 'desc',
            },
            take: countAsInt > 0 ? countAsInt : 5,
            skip: offsetAsInt > 0 ? offsetAsInt : 0,
        });

        // If no messages are found, return an error
        if (messages.length === 0) {
            return new Error('Message not found');
        }

        // Handle null values in each message
        messages.forEach(message => {
            handleNullValues(message, filter);
        });

        return messages;
    } catch (error: any) {
        console.error('Error fetching messages:', error);
        return new Error(error.message);
    }
}

export { find };
