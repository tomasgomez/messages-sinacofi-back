import { Message } from '@/backend/entities/message/message'

export function validateGetMessage(data: any): [Message, string, string] | Error {
  let message: Message = new Message();

  const { id, messageCode, date, status, count, offset, receiver, sender , family, areaCode, institutionCode } = data;

  let countResponse: string = '0';
  let offsetResponse: string = '0';

  if (id && typeof id === 'string' && id.trim() !== ''){
    message.id = id;
  }

  if (messageCode && typeof messageCode === 'string' && messageCode.trim() !== '') {
    message.messageCode = messageCode;
  }

  if (date && typeof date === 'string' && date.trim() !== '') {
    message.creationDate = date;
  }

  if (status && typeof status === 'string' && status.trim() !== '') {
    message.status = status;
  }

  if (count && typeof count === 'string' && count.trim() !== '') {
    countResponse = count;
  }

  if (offset && typeof offset === 'string' && offset.trim() !== '') {
    offsetResponse = offset;
  }

  if (institutionCode && typeof institutionCode === 'string' && institutionCode.trim() !== '') {
    message.sender = institutionCode;
  }

  if (sender && typeof sender === 'string' && sender.trim() !== '') {
    message.sender = sender;
  }

  if (receiver && typeof receiver === 'string' && receiver.trim() !== '') {
    message.receiver = receiver;
  }

  return [message, countResponse, offsetResponse];
}