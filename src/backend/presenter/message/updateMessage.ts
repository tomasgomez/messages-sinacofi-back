import { Message } from '../../entities/message/message';

export function validateUpdateMessage(data: any): Message | Error {
  let message: Message = new Message()

  const {id, status } = data;

  if (id && typeof id === 'string' && id.trim() !== '') {
    message.id = id;
  } else {
    return new Error('Invalid id');
  }

  if (status && typeof status === 'string' && status.trim() !== '') {
    message.status = status;
  } else {
    return new Error('Invalid status');
  }

  return message;
}