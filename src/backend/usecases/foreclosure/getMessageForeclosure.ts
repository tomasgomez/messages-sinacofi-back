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

    /* Get the CUKs */
    const cuks = await cukRepository.find(filter);

    if (cuks instanceof Error) {
      return cuks;
    }

    if (cuks.length === 0) {
      return new Error('No message found');
    }

    return cuks;
  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}