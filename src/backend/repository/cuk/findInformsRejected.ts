import { Filter } from '@/backend/entities/cuk/filter';
import { PrismaClientWrapper } from '../prismaWrapper';
import { CUK } from '@/backend/entities/cuk/cuk';
import { Prisma } from '@prisma/client';
import { MessageTypes } from '@/backend/entities/message/types';
import { filtersCukWhere } from './generateQueryByFilters';
import { Paginated } from '@/backend/entities/pagination/Paginated';

function include():Prisma.CUKInclude{
    const include: Prisma.CUKInclude = { 
      messages: { 
          select: {
            messageCode: true,
            origin: true,
            creationDate: true,
            creationTime: true,
            destination: true,
            cukCode: true,
            NSE: true,
            NSR: true,
        },
      }, 
      parameters: {
          where: {
              OR :[{
                  messageCode: MessageTypes.ALZAMIENTO_HIPOTECARIO, 
                  name: {
                    in: [
                      'channel',
                      'notary',
                      'repertoireDate',
                      'repertoireNumber',
                      'buyerDni',
                      'borrowerDni',
                      'sellerDni',
                      'observations'
                    ]
                  }
                },
                {
                  messageCode: MessageTypes.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO, 
                  name: {
                    in: [
                      'rejectionReason',
                    ]
                  }
              }]
          },
          select: {
              name: true,
              value: true,
              updatedAt: true
          }
      },
  };
  
  return include;
}
export async function findInformsRejected(filter: Filter): Promise < Paginated<CUK> | Error > {
  try {
      const prisma = new PrismaClientWrapper();
      const prismaClient = prisma.getClient();

      // Parse count and offset from filter
      let countAsInt = parseInt(filter.count ?? '0', 10);
      let offsetAsInt = parseInt(filter.offset ?? '0', 10);

      // Find all messages if count is not provided or is 0
      const cuks: CUK[] = await prismaClient.cUK.findMany({
        take: countAsInt > 0 ? countAsInt : 5, 
        skip: offsetAsInt,
        orderBy: { createdAt: 'desc' },
        include: include(),
        where: filtersCukWhere(filter)
      });
      // If the messages are not found, return an error
      if (cuks.length === 0) {
          return new Error('Message not found');
      }

      const count: number = await prismaClient.cUK.count({
        where: filtersCukWhere(filter)
      });

      return Paginated.fromPrimitives(cuks, countAsInt, offsetAsInt, count);

  } catch (error: any) {
      console.error('Error fetching Informs Accepted:', error);
      return error;
  }
}

