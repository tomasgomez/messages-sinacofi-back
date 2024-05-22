import { CUK } from '@/backend/entities/cuk/cuk';
import { Message } from '@/backend/entities/message/message';

export function validateUpdateMessageForeclosure(data: any): [CUK, Message] | Error {
  let cuk: CUK = new CUK();

  const {
    cukCode,
    id,
    status,
    messageId
  } = data;

  if (cukCode && typeof cukCode === 'string' && cukCode.trim() !== '') {
    cuk.cukCode = cukCode.trim();
  }

  if (id && typeof id === 'string' && id.trim() !== '') {
    cuk.id = id.trim();
  }

  if (status && typeof status === 'string' && status.trim() !== '') {
    cuk.status = status.trim();
  }

  let message: Message = new Message();

  if (messageId && typeof messageId === 'string' && messageId.trim() !== '') {
    message.id = messageId.trim();
  }

  if (Object.keys(cuk).length === 0) {
    return new Error('Invalid CUK');
  }


  return [cuk, message];
}