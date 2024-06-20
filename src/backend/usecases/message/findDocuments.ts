import { Message } from '../../entities/message/message';
import { docUseCase } from '../docs/usecases';

// Get message function
export async function findDocuments(message: Message): Promise<Message | Error> {
  try {
    // check if the message has documents
    if (!message.documents || message.documents.length == 0) {
    return message;
    }
    // get documents
    const documents = message.documents.map(async (doc) => {

        // check if documents has content
        if (doc.content) {
            return doc;
        }

        // get document
        const docResponse = await docUseCase.findDoc(doc);
        if (docResponse instanceof Error) {
            return message
        }
        return docResponse;
        });

    const docsResponse = await Promise.all(documents);
    // update documents
    message.documents = docsResponse;
    return message;
  
  } catch (error:  any) {
    console.error('Error updating message:', error);
    return error;
  }
}


