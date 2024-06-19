import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';
import { handleNullValues } from "@/backend/utils/functions";
import { FilterMessage } from "@/backend/entities/message/filter";
import { findSelect } from "@/backend/repository/message/presenter/findSelect";
import { findWhere } from "@/backend/repository/message/presenter/findWhere";
import { findStatus } from "./presenter/findStatus";

async function find(
    filter: FilterMessage, 
    includeParameters: boolean = false, 
    includeDocuments: boolean = false
): Promise<Message[] | Error> {
    try {
        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();
        
        let where = findWhere(filter)
        let select: any = findSelect(includeParameters,includeDocuments);
        
        let status: any = {};
        
        if (filter.status && filter.status.length > 0) {
            status = findStatus(filter);
        }
        
        const messages = await prismaClient.message.findMany({
            where: {
                ...where,
                status: status,
                documents: {},
                parameters: {},
            },
            select,
            orderBy: {
                createdAt: 'desc',
            },
            take: parseInt(filter.count ?? '5', 10) ?? 5,
            skip: parseInt(filter.offset ?? '0', 10) ?? 0,
        });

        // If no messages are found, return an error
        if (messages.length === 0) {
            return new Error('Message not found');
        }

        // Handle null values in each message
        messages.forEach(message => {
            handleNullValues(message);
        });

        return messages;
    } catch (error: any) {
        console.error('Error fetching messages:', error);
        return new Error(error.message);
    }
}

export { find };
