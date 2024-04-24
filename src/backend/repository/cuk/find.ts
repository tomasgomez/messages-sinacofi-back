import {
    PrismaClientWrapper
} from '../prismaWrapper';
import {
    CUK
} from '@/backend/entities/cuk/cuk';

async function find(cuk: CUK, count: string, offset: string): Promise < CUK[] | Error > {
    try {
        let cuks: CUK[];

        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        // Initialize the where object with the provided attributes to search with
        const where: any = {};

        // Loop through the provided attributes and add them to the where object
        for (const key in cuk) {
            if (cuk[key as keyof CUK] !== null && cuk[key as keyof CUK] !== undefined) {
                where[key as keyof CUK] = cuk[key as keyof CUK];
            }
        }

        // If count is not present then find all message
        if (count === '0' || count === '') {
            cuks = await prismaClient.cuk.findMany({
                where,
                orderBy: { createdDate: 'desc' }
            });
        } else {
            cuks = await prismaClient.cuk.findMany({
                where,
                orderBy: { createdDate: 'desc' },
                take: parseInt(count),
                skip: parseInt(offset)
            });
        }

        // If the messages are not found, return an error
        if (cuks.length === 0) {
            return new Error('Message not found');
        }

        return cuks;

    } catch (error: any) {
        console.error('Error fetching message:', error);
        return error;
    }
}

export {
    find
};