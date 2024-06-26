import {
  MessageRepository
} from '../../repository/messageRepository';
import {
  CUKRepository
} from '../../repository/cukRepository';
import {
  CUK
} from '../../entities/cuk/cuk';
import {
  Filter
} from '../../entities/cuk/filter';
import { getForeclosureStatusCodesByStatus } from '@/backend/entities/cuk/codes';

// Get message function
export async function getMessageForeclosureRejected(messageRepository: MessageRepository, cukRepository: CUKRepository, filter: Filter): Promise < CUK[] | Error > {
  try {

    /* Get the CUKs */
    const cuks = await cukRepository.find({
      ...filter,
      statusCategory: getForeclosureStatusCodesByStatus('rejected'),
      include:{
        parameters:false,
        documents:false
      }
    });

    if (cuks instanceof Error) {
      return cuks;
    }

    if (cuks.length === 0) {
      return new Error('No message found');
    }

    // wait for all messages to be updated
    const cukResponse = await Promise.all(cuks)

    return cukResponse;
  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}