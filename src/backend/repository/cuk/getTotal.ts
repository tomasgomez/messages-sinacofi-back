import {
    PrismaClientWrapper
} from '../prismaWrapper';
import {
    Filter
} from '@/backend/entities/cuk/filter';
import {
    cukFindManyQuery
} from '@/backend/repository/cuk/find';

async function getTotal(filter: Filter): Promise < string | Error > {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        let countData = await prismaClient.cUK.count({
                where: cukFindManyQuery(filter)
            });

        return countData.toString();

    } catch (error: any) {
        console.error('Error creating CUK:', error);
        return error;
    }
}

export {
    getTotal
};