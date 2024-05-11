import {
    Filter
} from '@/backend/entities/global/filter';
import {
    PrismaClientWrapper
} from '../prismaWrapper';
import {
    CUK
} from '@/backend/entities/cuk/cuk';
import {
    handleNullValues,
    createDateRangeFilter
} from '@/backend/utils/functions';
import {
    setCukHistory
} from '@/backend/utils/foreclosure/history';


async function find(filter: Filter): Promise < CUK[] | Error > {
    try {
        let cuks: CUK[];

        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        // Parse count and offset from filter
        let countAsInt = parseInt(filter.count ?? '0', 10);
        let offsetAsInt = parseInt(filter.offset ?? '0', 10);

        let where = createWhereFromFilter(filter);
        let select = createSelectFromFilter();


        // Find all messages if count is not provided or is 0
        cuks = await prismaClient.cUK.findMany({
            where,
            orderBy: {
                creationDate: 'desc'
            },
            take: countAsInt > 0 ? countAsInt : 5, 
            skip: offsetAsInt,
            include: {
                messages: {
                    select,
                    where: {
                        cukCode: { in: filter.cukCode },
                    },
                    orderBy: {
                        creationDate: 'desc'
                    },
                }
            }
        });

        // If the messages are not found, return an error
        if (cuks.length === 0) {
            return new Error('Message not found');
        }

        for (let cuk of cuks) {
            if (cuk.messages !== undefined && cuk.messages.length > 0) {
                for (let message of cuk.messages) {
                    handleNullValues(message, false);
                }
            }

            cuk.history = setCukHistory(cuk);
            
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

function createWhereFromFilter(filter: Filter): any {
    let where: any = {};

    where.id = {
        in: filter.id
    };
    where.name = {
        in: filter.name
    };
    where.cukCode = {
        in: filter.cukCode
    };
    where.description = {
        in: filter.description
    };
    where.channel = {
        in: filter.channel
    };
    where.status = {
        in: filter.status
    };
    where.institutionCode = {
        in: filter.institutionCode
    };
    where.institutionDestination = {
        in: filter.institutionDestination
    };
    where.region = {
        in: filter.region
    };
    where.buyerDni = {
        in: filter.buyerDni
    };
    where.buyer = {
        in: filter.buyer
    };
    where.ownerDni = {
        in: filter.ownerDni
    };
    where.owner = {
        in: filter.owner
    };
    where.borrowerDni = {
        in: filter.borrowerDni
    };
    where.borrower = {
        in: filter.borrower
    };

    let dateRangeFilter = createDateRangeFilter(filter.startDate, filter.endDate);

    where = {
        ...where,
        ...dateRangeFilter
    };

    return where;
}

function createSelectFromFilter(): any {
    let select: any = {
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
    }

    return select;
}
