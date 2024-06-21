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
export async function getMessageForeclosureRejected(messageRepository: MessageRepository, cukRepository: CUKRepository, filter: Filter): Promise < CUK[] | Error > {
  try {

    /* Get the CUKs */
    const cuks = await cukRepository.find({
      ...filter,
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

    /* Get all messages with documents */
    // const cuksUpdated = cuks.map(async (cuk: CUK) => {
    //   // get messages
    //   if (!cuk.messages || cuk.messages.length == 0) {
    //     return cuk;
    //   }
    //   // mapping messages
    //   const messages = cuk.messages.map(async (message) => {
    //     // get message
    //     const messageResponse = await messageUseCase.findDocuments(message);

    //     console.log("message",messageResponse);
    //     if (messageResponse instanceof Error) {
    //       throw messageResponse;
    //     }
    //     return messageResponse;
    //   });
    //   const messagesUpdated = await Promise.all(messages);
    //   // update messages
    //   cuk.messages = messagesUpdated;
    //   return cuk;
    // });

    // wait for all messages to be updated
    const cukResponse = await Promise.all(cuks)

    return cukResponse;
  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}