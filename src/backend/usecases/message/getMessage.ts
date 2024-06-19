import { MessageRepository } from '../../repository/messageRepository';
import { Message } from '../../entities/message/message';
import { findDocuments } from './findDocuments';
import { FilterMessage } from '@/backend/entities/message/filter';

// Get message function
export async function getMessage(repository: MessageRepository, filter: FilterMessage): Promise<Message[] | Error> {
  try {
    let messageResponse = await repository.find(filter);
    
    /* Check if the response is an error */
    if (messageResponse instanceof Error) {
      console.error('Error fetching message:', messageResponse);
      return messageResponse;
    }

    /* Get all messages with documents */
    const messageUpdated = messageResponse.map(async(message: Message) => {
      // check if the message has documents
      if (!message.documents || message.documents.length == 0) {
        return message;
      }
      // get documents
      const messageWithDocs = await findDocuments(message);
      if (messageWithDocs instanceof Error) {
        throw messageWithDocs;
      }
      return messageWithDocs;
    });
    // wait for all messages to be updated
    const messages = await Promise.all(messageUpdated);
    return messages;

  } catch (error:  any) {
    console.error('Error updating message:', error);
    return error;
  }
}
