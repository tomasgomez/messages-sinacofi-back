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

export async function find(filter: Filter): Promise < CUK[] | Error > {
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

        return cuks;

    } catch (error: any) {
        console.error('Error fetching message:', error);
        return error;
    }
}

const cukFindManyQuery = (filter: Filter, count: number, offset: number): Prisma.CUKFindManyArgs => {

    // Create the response object
    let query: Prisma.CUKFindManyArgs = {
        take: count > 0 ? count : 5, 
        skip: offset,
        orderBy: { createdAt: 'desc' },
    }

    let cukWhere: Prisma.CUKWhereInput = {
        ...createDateRangeFilter(filter.startDate, filter.endDate),
    };
    
    // FILTERS CUK by cukCode
    if(filter.cukCode && filter.cukCode.length > 0){
        cukWhere.cukCode = { in: filter.cukCode };
    }

    // FILTERS CUK by id
    if(filter.id && filter.id.length > 0){
        cukWhere.id = { in: filter.id };
    }

    let messagesWhere: Prisma.MessageWhereInput = {};
    messagesWhere.AND=[];



    // FILTER MESSAGES BY institutionDestination
    if (filter.institutionDestination && filter.institutionDestination.length > 0) {
        messagesWhere.destination = { in: filter.institutionDestination };
        messagesWhere.status = { some:{ id: { in: ["05"] } } };            
    }


    // const SenderMessageCodes = ["670","674","677"];
    // const ReceiverMessageCodes = ["671", "672", "673", "675","676","678", "679"];

    // FILTER MESSAGES BY messageCode
    if ((filter.messageCode && filter.messageCode.length > 0)&& (filter.status && filter.status.length > 0)) {
        const messageCode = {
            messageCode: { in: filter.messageCode },
            status:{},
            origin:{}
        }
        // messagesWhere.messageCode = { in: filter.messageCode };

        // FILTERS CUK BY status 
        if(filter.status && filter.status.length > 0){
            messageCode.status = { 
                some:{ 
                    id: { in: filter.status }
                }
            };
        }

        if (filter.institutionCode && filter.institutionCode.length > 0) {
            messageCode.origin = { in: filter.institutionCode };
        }

        messagesWhere.AND.push(messageCode);
    // FILTER MESSAGES BY institutionCode
    }else if (filter.institutionCode && filter.institutionCode.length > 0) {
        messagesWhere.OR = [{
            origin: { in: filter.institutionCode },
            status: { 
                some: { 
                    id: { in: ["01", "05"] }
                }
            }       
        }, {
            destination: { in: filter.institutionCode },
            status: { 
                some:{
                    id: { in: ["06"] }
                } 
            }
        }]
    }
    
    let parametersWhere: Prisma.ParametersWhereInput = {};
    parametersWhere.AND=[];

    // FILTER PARAMETERS BY description
    if(filter.description && filter.description.length > 0){
        parametersWhere.description ={ in: filter.description };
    }

    if(filter.sellerDni && filter.sellerDni.length > 0){
        messagesWhere.AND.push({parameters:{
            some:{
                name: 'sellerDni',
                value: { in: filter.sellerDni}
            }
        }})
    }

    // FILTER PARAMETERS BY channel
    if(filter.channel && filter.channel.length > 0){
        messagesWhere.AND.push({parameters:{
            some:{
                name: 'channel',
                value: { in: filter.channel}
            }
        }})
    }

    // FILTER PARAMETERS BY region    
    if(filter.region && filter.region.length > 0){        
        messagesWhere.AND.push({parameters:{
            some:{
                name: 'region',
                value: { in: filter.region }
            }
        }})
    }
    
    // FILTER PARAMETERS BY buyerDni
    if(filter.buyerDni && filter.buyerDni.length > 0){
        messagesWhere.AND.push({parameters:{
            some:{
                name: 'buyerDni',
                value: { in: filter.buyerDni}
            }
        }})
    }

    // FILTER PARAMETERS BY buyer
    if(filter.buyer && filter.buyer.length > 0){
        messagesWhere.AND.push({parameters:{
            some:{
                name: 'buyer',
                value: { in: filter.buyer}
            }
        }})
    }

    // FILTER PARAMETERS BY ownerDni
    if(filter.ownerDni && filter.ownerDni.length > 0){
        messagesWhere.AND.push({parameters:{
            some:{
                name: 'ownerDni',
                value: { in: filter.ownerDni}
            }
        }})
    }

    // FILTER PARAMETERS BY owner
    if(filter.owner && filter.owner.length > 0){
        messagesWhere.AND.push({parameters:{
            some:{
                name: 'owner',
                value: { in: filter.owner}
            }
        }})
    }

    // FILTER PARAMETERS BY borrowerDni
    if(filter.borrowerDni && filter.borrowerDni.length > 0){
        messagesWhere.AND.push({parameters:{
            some:{
                name: 'borrowerDni',
                value: { in: filter.borrowerDni}
            }
        }})
    }

    // FILTER PARAMETERS BY borrower
    if(filter.borrower && filter.borrower.length > 0){
        messagesWhere.AND.push({parameters:{
            some:{
                name: 'borrower',
                value: { in: filter.borrower}
            }
        }})
    }
        
    // set values to query
    query.where = {
        ...cukWhere, 
        parameters:{ some: {...parametersWhere} }, 
        messages: { some: {...messagesWhere} } 
    };
    // define include
    let include: Prisma.CUKInclude = { 
        messages: { 
            select: findSelect(),
        }, 
        parameters: {
            where: {
                // CHECK, cuando se filtra por institutionDestination, no esta tomando los otros mensajes
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
                            'beneficiaryBank',
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

    query.include = include;      
    return query;
}

