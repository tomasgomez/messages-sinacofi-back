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

  const { TSN, OSN, NSE, messageCode, destination, description, priority, status, sender, creationDate, creationTime, receiver, receivedDate, receivedTime, actions, documents, parameters } = data;

  if (TSN && typeof TSN === 'string' && TSN.trim() !== '') {
    message.TSN = TSN;
  } else {
    return new Error('Invalid TSN');
  }

  if (OSN && typeof OSN === 'string' && OSN.trim() !== '') {
    message.OSN = OSN;
  } else {
    return new Error('Invalid OSN');
  }

  if (NSE && typeof NSE === 'string' && NSE.trim() !== '') {
    message.NSE = NSE;
  } else {
    return new Error('Invalid NSE');
  }

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

  if (description && typeof description === 'string' && description.trim() !== '') {
    message.description = description;
  } else {
    return new Error('Invalid description');
  }

  if (priority && typeof priority === 'string' && priority.trim() !== '') {
    message.priority = priority;
  } else {
    return new Error('Invalid priority');
  }

  if (status && typeof status === 'string' && status.trim() !== '') {
    message.status = status;
  } else {
    return new Error('Invalid status');
  }

  if (sender && typeof sender === 'string' && sender.trim() !== '') {
    message.sender = sender;
  } else {
    return new Error('Invalid sender');
  }

  if (creationDate && typeof creationDate === 'string' && creationDate.trim() !== '') {
    message.creationDate = creationDate;
  } else {
    return new Error('Invalid creationDate');
  }

  if (creationTime && typeof creationTime === 'string' && creationTime.trim() !== '') {
    message.creationTime
  }

  if (receiver && typeof receiver === 'string' && receiver.trim() !== '') {
    message.receiver = receiver;
  } else {
    return new Error('Invalid receiver');
  }

  if (receivedDate && typeof receivedDate === 'string' && receivedDate.trim() !== '') {
    message.receivedDate = receivedDate;
  }

  if (receivedTime && typeof receivedTime === 'string' && receivedTime.trim() !== '') {
    message.receivedTime = receivedTime;
  }

  if (actions && typeof actions === 'string' && actions.trim() !== '') {
    message.actions = actions;
  }

  if (documents && typeof documents === 'string' && documents.trim() !== '') {
    message.documents = documents;
  }

  if (parameters && typeof parameters === 'object') {
    message.parameters = parameters;
  }

  return message;
}