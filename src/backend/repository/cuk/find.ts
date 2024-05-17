import {
    Filter
} from '@/backend/entities/cuk/filter';
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

        // TODO: Crear un CUK que sea para el front que extienda el CUK para bd y que tenga los metodos para convertirse y ademas agregar otras clases (ex history)
        // for (let cuk of cuks) {
        //     if (cuk.messages !== undefined && cuk.messages.length > 0) {
        //         for (let message of cuk.messages) {
        //             handleNullValues(message, false);
        //         }
        //     }

        //     cuk.history = setCukHistory(cuk);
            
        // }
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
    where.cukCode = {
        in: filter.cukCode
    };
    where.status = {
        in: filter.status
    };

    // check if filter has institutionCode
    if (filter.institutionCode) {
        messageArgs.where = {
            OR: [{AND: [{origin: {in: filter.institutionCode}}, {statusId: {in: ["01", "05",""]}}]}, {AND: [{destination: {in: filter.institutionCode}}, { OR: [{ statusId: { in: ["06"] } }, { statusId: null }]}]}]
        }
        where.messages = {
            some: {
                OR: [{AND: [{origin: {in: filter.institutionCode}}, {statusId: {in: ["01", "05",""]}}]}, {AND: [{destination: {in: filter.institutionCode}}, { OR: [{ statusId: { in: ["06"] } }, { statusId: null }]}]}]
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


function createSelectFromFilter(): Prisma.MessageSelect {
    let select: Prisma.MessageSelect = {
        id: true,
        TSN: true,
        OSN: true,
        NSE: true,
        LSN: true,
        NSR: true,
        messageCode: true,
        statusId: true,
        origin: true,
        destination: true,
        originArea: true,
        destinationArea: true,
        creationDate: true,
        creationTime: true,
        receivedDate: true,
        receivedTime: true,
        cukCode: true,
        actions: true,
        createdAt: true,
        documents: true,
        parameters: true
    }

    return select;
}
