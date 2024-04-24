import { MessageRepository } from '../../repository/messageRepository';
import { CUKRepository } from '../../repository/cukRepository';
import { CUK } from '../../entities/cuk/cuk';
import { MessageFilter } from '../../entities/message/filter';
import { Message } from '../../entities/message/message';

// Get message function
export async function getMessageForeclosure(messageRepository: MessageRepository, cukRepository: CUKRepository, filter: MessageFilter ): Promise<CUK[] | Error> {
  try {
    /* Create a new CUK object */
    const filterCuk = new CUK();

    let count = '5';
    let offset = '0';

    if (filter.count) {
      count = filter.count;
    }

    if (filter.offset) {
      offset = filter.offset;
    }

    filterCuk.cukCode = filter.cukCode;

    /* Get the CUKs */
    const cuks = await cukRepository.find(filterCuk, count, offset);

    if (cuks instanceof Error) {
      throw cuks;
    }

    if (cuks.length === 0) {
      throw new Error('No message found');
    }

    /* Get the messages for each CUK */
    for (const cuk of cuks) {
      let newMessage = new Message();

      newMessage.cukCode = cuk.cukCode;

      /* Get the messages */
      const messages = await messageRepository.find(newMessage, false, count, offset);

      if (messages instanceof Error) {
        throw messages;
      }

      if (messages.length === 0) {
        cuk.messages = [];
        continue;
      }

      cuk.messages = messages;
    }

    return cuks;
  } catch (error:  any) {
    console.error('Error updating message:', error);
    return error;
  }
}


