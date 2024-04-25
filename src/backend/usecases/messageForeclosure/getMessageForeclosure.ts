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

// Get message function
export async function getMessageForeclosure(messageRepository: MessageRepository, cukRepository: CUKRepository, filter: Filter): Promise < CUK[] | Error > {
  try {

    /* Set count and offset */
    let count = '5';
    let offset = '0';

    if (filter === undefined) {
      filter = {};
    }

    if (filter.count !== undefined && filter.count !== '') {
      count = filter.count;
    }

    if (filter.offset !== undefined && filter.offset !== '') {
      offset = filter.offset;
    }

    /* Get the CUKs */
    const cuks = await cukRepository.find(filter, count, offset);

    if (cuks instanceof Error) {
      throw cuks;
    }

    if (cuks.length === 0) {
      throw new Error('No message found');
    }

    return cuks;
  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}