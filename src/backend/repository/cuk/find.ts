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
import { Prisma } from '@prisma/client';


async function find(filter: Filter): Promise < CUK[] | Error > {
    try {
        let cuks: CUK[];

        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        // Parse count and offset from filter
        let countAsInt = parseInt(filter.count ?? '0', 10);
        let offsetAsInt = parseInt(filter.offset ?? '0', 10);

        const query = cukFindManyQuery(filter, countAsInt, offsetAsInt);
        // Find all messages if count is not provided or is 0
        cuks = await prismaClient.cUK.findMany(query);


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


const cukFindManyQuery = (filter: Filter, count: number, offset: number): Prisma.CUKFindManyArgs => {

    // Create the response object
    let query: Prisma.CUKFindManyArgs = {
        take: count > 0 ? count : 5, 
        skip: offset,
        orderBy: { createdAt: 'desc' },
    }

    // defune MessageArgs
    let messageArgs: Prisma.CUK$messagesArgs = {
        select: createSelectFromFilter(),
    };

    const dateRangeFilter =  createDateRangeFilter(filter.startDate, filter.endDate);
    // create where from filter
    let where: Prisma.CUKWhereInput = {
        ...dateRangeFilter
    };
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

    // check if filter has institutionCode
    if (filter.institutionCode) {
        messageArgs.where = {
            OR: [{AND: [{sender: {in: filter.institutionCode}}, {status: {in: ["01", "05"]}}]}, {AND: [{receiver: {in: filter.institutionCode}}, {status: "06"}]}]
        }
        where.messages = {
            some: {
                OR: [{AND: [{sender: {in: filter.institutionCode}}, {status: {in: ["01", "05"]}}]}, {AND: [{receiver: {in: filter.institutionCode}}, {status: "06"}]}]
            }
        }
    }
    // set values to query
    query.where = where;
    // define include
    let include: Prisma.CUKInclude = { messages: messageArgs };
    // set include to query
    query.include = include;

    return query;
}


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

    where.messages = {
        some: {
                OR: [{
                sender: {
                    in: filter.institutionCode
                }},
                {receiver: {
                    in: filter.institutionCode
                }
            }]
            }
        }
    

    let dateRangeFilter = createDateRangeFilter(filter.startDate, filter.endDate);

    where = {
        ...where,
        ...dateRangeFilter
    };

    return where;
}

function createSelectFromFilter(): Prisma.MessageSelect {
    let select: Prisma.MessageSelect = {
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
        parameters: true
    }

    return select;
}
