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
        // TODO: UNCOMMENT THIS
        // documentToStore.content = document
        documentToStore.content = "JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9MZW5ndGggNDAzPj4Kc3RyZWFtCkJUIGgKc2xlc3QoMC45NiwgMC45NikgVGVycnkgdGV4dApTdCwgVGVycnkgdGV4dCB3aXRoIFBESkAKU1REIC9Gb250IDEwIFRGLzENCgpCVCBoCgoKZ29yZG4gLSAuCiAgaGVsbG8gd29ybGQgLgoKU1REIC9Gb250IDEwIFRGLzENCi9VbmljcyA4MjQgLTUgQ0FQTSAoQ0EpCgoKRU5EU1RSRUFNRU5ECkVPRgo="
      }

      documents.push(document);
    }

    message.documents = documents;
  }

  return message;
}