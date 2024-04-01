import { Message } from '../message';

export function validateGetMessage(data: any): [Message, string, string] | Error {
  let message: Message = new Message();

  const { id, messageCode, date, status, count, offset /*, family, areaCode, institutionCode*/ } = data;

  let countResponse: string = '0';
  let offsetResponse: string = '0';

  if (id && typeof id === 'number') {
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

  return [message, countResponse, offsetResponse];
}