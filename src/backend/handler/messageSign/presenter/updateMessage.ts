import { Message } from '@/backend/entities/message/message';
import { Document } from '@/backend/entities/global/document';
import { validateParameters } from '@/backend/handler/message/presenter/validateParameters';
import { Parameter } from '@/backend/entities/message/parameter';

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
    let parametersMessage: Parameter[] = [];
    let cukCode = '';

    [parametersMessage, cukCode] = validateParameters(data.messageCode, data.parameters);

    if (cukCode !== '') {
      message.cukCode = cukCode;
    }

    message.parameters = parametersMessage;
  }

  if (data.documents && data.documents.length > 0) {
    for (let document of data.documents) {
      let documentToStore: Document = {}

      if (document) {
        documentToStore.documentName = document.documentName;
        documentToStore.content = document.content;
      }
      documents.push(documentToStore);
    }

    message.documents = documents;
  }

  return message;
}