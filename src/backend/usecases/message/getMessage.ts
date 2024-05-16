import { MessageRepository } from '../../repository/messageRepository';
import { Message } from '../../entities/message/message';
import { docUseCase } from '../docs/usecases';
import { Documents } from '@/backend/entities/message/interface';
import { findDocuments } from './findDocuments';

// Get message function
export async function getMessage(repository: MessageRepository, message: Message, count: string, offset: string): Promise<Message[] | Error> {
  try {

    /* Get the messages */
    let messageResponse: Message[] | Error =  await repository.find(message, false, count, offset);
    
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


