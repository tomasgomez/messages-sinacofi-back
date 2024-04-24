import { MessageRepository } from '../../repository/messageRepository';
import { CUKRepository } from '../../repository/cukRepository';
import { CUK } from '../../entities/cuk/cuk';
import { MessageFilter } from '../../entities/message/filter';

// Get message function
export async function getMessageForeclosure(messageRepository: MessageRepository, cukRepository: CUKRepository, filter: MessageFilter ): Promise<CUK[] | Error> {
  try {
    const cuk = new CUK();

    let count = '5';
    let offset = '0';

    if (filter.count) {
      count = filter.count;
    }

    if (filter.offset) {
      offset = filter.offset;
    }

    const result = await cukRepository.find(cuk, count, offset);

    if (result instanceof Error) {
      throw result;
    }

    if (result.length === 0) {
      throw new Error('No message found');
    }

    for (const fetchedCuk of result) {
      const message = await messageRepository.find(fetchedCuk, true, count, offset);

      if (message instanceof Error) {
        throw message;
      }

      fetchedCuk.messages = message;
    }


    return result;
  } catch (error:  any) {
    console.error('Error updating message:', error);
    return error;
  }
}


