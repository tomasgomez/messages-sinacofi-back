import { Message } from '@/backend/entities/message/message';
import { Documents } from '@/backend/entities/message/interface';

export function validateUpdateMessage(data: any): Message | Error {
  let message: Message = new Message()
  let documents: Documents[] = []
 if (!data.id) {
    return new Error('Missing required fields');
  }

  message.id = data.id;

  if (data.messageCode) {
    message.messageCode = data.messageCode;
  }

  if (data.priority) {
    message.priority = data.priority;
  }

  if (data.status) {
    message.status = data.status;
  }

  if (data.sender) {
    message.sender = data.sender;
  }

  if (data.receiver) {
    message.receiver = data.receiver;
  }

  if (data.parameters) {
    message.parameters = data.parameters;
  }

  if (data.documents && data.documents.length > 0) {
    for (let document of data.documents) {
      let documentToStore: Documents = {}

      if (document) {
        documentToStore.content = document
      }

      documents.push(document);
    }

    message.documents = documents;
  }

  return message;
}