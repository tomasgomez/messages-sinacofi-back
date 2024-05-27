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
    createDateRangeFilter
} from '@/backend/utils/functions';
import {
    findSelect
} from '@/backend/repository/message/presenter/findSelect';
import { Prisma } from '@prisma/client';
import { MessageTypes } from '@/backend/entities/message/types';


async function find(filter: Filter): Promise < CUK[] | Error > {
    try {
        console.log(filter)
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
        select: findSelect(),
    };

    // check if filter has institutionCode
    if (filter.institutionCode) {
        messageArgs.where = {
            OR: [
                {
                    AND: [
                        {
                            origin: {
                                in: filter.institutionCode
                            }
                        }, 
                    {
                    status: { 
                        
                        some: 
                        { 
                            id: {
                                in: ["01", "05"] 
                        }
                    }
                }       
            }
        ]}, {
            AND: [
                {
                    destination: {
                        in: filter.institutionCode
                    }
                }, {
                    OR: [
                        { 
                            status: { 
                                some:{
                                    id: { 
                                        in: ["06"]
                                }
                            } 
                        } 
                    } 
                ]
            }
        ]}]}
        // where.messages = {
        //     some: {
        //         OR: [{AND: [{origin: {in: filter.institutionCode}}, {status: {some: {id: {in: ["01", "05",""]}}}}]}, {AND: [{destination: {in: filter.institutionCode}}, { OR: [{ status: { some: {id: {in: ["06"]}} } }]}]}]
        //     }
        // }
    }


    const dateRangeFilter =  createDateRangeFilter(filter.startDate, filter.endDate);
    // create where from filter
    let where: Prisma.CUKWhereInput = {
        ...dateRangeFilter
    };

    if(filter.id && filter.id.length > 0)
    where.id = {
        in: filter.id
    };

    if(filter.cukCode && filter.cukCode.length > 0)
    where.cukCode = {
        in: filter.cukCode
    };

    if(filter.status && filter.status.length > 0)
    where.status = {
        in: filter.status
    };
    if (filter.institutionCode?.length != 0){
        where.messages = { 
            some: {    
                OR: [
                    {
                        AND: [
                            {
                                origin: {
                                    in: filter.institutionCode
                                }
                            }, 
                    {
                        status: { 
                            some: { 
                                id: {
                                    in: ["01", "05"] 
                                } 
                            }
                        }
                    
            }
        ]}, {
            AND: [
                {
                    destination: {
                        in: 
                        filter.institutionCode
                    }
                }, 
                { 
                    OR: [
                        { 
                            status: { 
                                some:{
                                    id: { 
                                        in: ["06"]
                                    }
                                } 
                            } 
                        } 
                    ]
                }
            ]
        }]
        }
        }
}
    // where.messages = {
    //     some: {
    //         OR: [{AND: [{origin: {in: filter.institutionCode}}, {status: {some: {id: {in: ["01", "05",""]}}}}]}, {AND: [{destination: {in: filter.institutionCode}}, { OR: [{ status: { some: {id: {in: ["06"]}} } }]}]}]
    //     }
    // }

    // set values to query
    query.where = where;
    // define include
    let include: Prisma.CUKInclude = { 
        messages: messageArgs, 
        parameters: {
            where: {
                messageCode: MessageTypes.ALZAMIENTO_HIPOTECARIO,
                name: {
                        in: [
                            'id',
                            'name',
                            'cukCode',
                            'description',
                            'status',
                            'creationDate',
                            'issuedDate',
                            'channel',
                            'bank',
                            'region',
                            'buyerDni',
                            'buyer',
                            'ownerDni',
                            'owner',
                            'borrowerDni',
                            'borrower',
                        ]
                    }            
                },
            select: {
                name: true,
                value: true
            }
        },
        history: true
    };

    // set include to query
    query.include = include;

    return query;
}

