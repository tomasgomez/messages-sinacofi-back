import { Message } from '@/backend/entities/message/message';
import { Document } from '@/backend/entities/global/document';

export function validateUpdateMessage(data: any): Message | Error {
  let message: Message = new Message()
  let documents: Document[] = []
 if (!data.id) {
    return new Error('Missing required fields');
  }

  message.id = data.id;


  if (data.status) {
    message.statusCode = data.status;
  }

  if (data.messageCode) {
    message.messageCode = data.messageCode;
  }

  if (data.parameters) {
    message.parameters = data.parameters;
  }

  if (data.documents && data.documents.length > 0) {
    for (let document of data.documents) {
      let documentToStore: Document = {}

      if (document) {
        documentToStore.content = document
      }

      documents.push(document);
    }

    message.documents = documents;
  }

  return message;
}