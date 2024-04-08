import { Message } from '../entities/message';

export function validateGetMessage(data: any): [Message, string, string] | Error {
  let message: Message = new Message();

  const { id, messageCode, date, status, count, offset /*, family, areaCode, institutionCode*/ } = data;

  let countResponse: string = '0';
  let offsetResponse: string = '0';


  if (id && typeof id === 'string' && id.trim() !== ''){
    let idToNumber = parseInt(id);

    if (isNaN(idToNumber)) {
      return new Error('Invalid id');
    }

    message.id = idToNumber;
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

export function validateCreateMessage(data: any): Message | Error {
  let message: Message = new Message();

  const {messageCode, destination, priority, sender, receiver, parameters } = data;

  if (messageCode && typeof messageCode === 'string' && messageCode.trim() !== '') {
    message.messageCode = messageCode;
  } else {
    return new Error('Invalid messageCode');
  }

  if (destination && typeof destination === 'string' && destination.trim() !== '') {
    message.destination = destination;
  } else {
    return new Error('Invalid destination');
  }

  if (priority && typeof priority === 'string' && priority.trim() !== '') {
    message.priority = priority;
  } else {
    return new Error('Invalid priority');
  }

  if (sender && typeof sender === 'string' && sender.trim() !== '') {
    message.sender = sender;
  } else {
    return new Error('Invalid sender');
  }

  if (receiver && typeof receiver === 'string' && receiver.trim() !== '') {
    message.receiver = receiver;
  } else {
    return new Error('Invalid receiver');
  }

  if (parameters && typeof parameters === 'object') {
    message.parameters = parameters;
  }

  return message;
}