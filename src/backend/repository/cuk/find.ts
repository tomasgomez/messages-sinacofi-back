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
import { MessageStatus } from '@/utils/messagesStatus';
import { MessageTypes } from '@/backend/entities/message/types';
import { History } from '@/backend/entities/cuk/history';

async function find(filter: Filter): Promise < CUK[] | Error > {
    try {
        let cuks: CUK[];

        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();

        // Parse count and offset from filter
        let countAsInt = parseInt(filter.count || '0', 10);
        let offsetAsInt = parseInt(filter.offset || '0', 10);

        let dateRangeFilter = createDateRangeFilter(filter.startDate, filter.endDate);


        // handling if message code is not provided
        if (filter.messageCode == undefined || filter.messageCode == null) {
            filter.mesageCode = [MessageTypes.ALZAMIENTO_HIPOTECARIO]
        }

        // Find all messages if count is not provided or is 0
        cuks = await prismaClient.cUK.findMany({
            where: {
                id: {
                    in: filter.id
                },
                name: {
                    in: filter.name
                },
                cukCode: {
                    in: filter.cukCode
                },
                description: {
                    in: filter.description
                },
                channel: {
                    in: filter.channel
                },
                status: {
                    in: filter.status
                },
                institutionCode: {
                    in: filter.institutionCode
                },
                institutionDestination: {
                    in: filter.institutionDestination
                },
                region: {
                    in: filter.region
                },
                buyerDni: {
                    in: filter.buyerDni
                },
                buyer: {
                    in: filter.buyer
                },
                ownerDni: {
                    in: filter.ownerDni
                },
                owner: {
                    in: filter.owner
                },
                borrowerDni: {
                    in: filter.borrowerDni
                },
                borrower: {
                    in: filter.borrower
                },
                ...dateRangeFilter
            },
            orderBy: {
                creationDate: 'desc'
            },
            take: countAsInt > 0 ? countAsInt : 5, // Take 5 by default if count is not provided or 0
            skip: offsetAsInt,
            include: {
                messages: { // Include messages with the following fields (omit parameters)
                    select: {
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
                    },
                    where: {
                        OR: [
                          {
                            messageCode: {
                              notIn: filter.mesageCode
                            }
                          },
                          {
                            AND: [
                              {
                                messageCode: {
                                    in: filter.mesageCode
                                },
                              },
                              {
                                OR: [
                                    {
                                        status: MessageStatus.ENVIADO
                                    },
                                    {
                                        status: MessageStatus.PREPARADO
                                    }
                                ]
                              }
                            ]
                          }
                        ]
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
            // Check if history exists
            if (cuk.history && typeof cuk.history === 'string' && cuk.history.trim() !== '') {

                // Parse Json
                let historyArray = JSON.parse(cuk.history);

                // Check if historyArray is an array
                if (Array.isArray(historyArray)) {
                    cuk.history = historyArray.map((history: History) => {
                        return {
                            cukCode: history.cukCode,
                            status: history.status,
                            date: history.date
                        }
                    });
                }
            } 
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