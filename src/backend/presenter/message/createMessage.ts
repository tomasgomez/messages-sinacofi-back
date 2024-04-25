import { Message } from '../../entities/message/message';

export function validateCreateMessage(data: any): Message | Error {
  let message: Message = new Message();

  const {messageCode, priority, status, receiver, sender, parameters, cukCode } = data;

  if (messageCode && typeof messageCode === 'string' && messageCode.trim() !== '') {
    message.messageCode = messageCode;
  } else {
    return new Error('Invalid messageCode');
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

  if (status && typeof status === 'string' && status.trim() !== '') {
    message.status = status;
  }

  if (receiver && typeof receiver === 'string' && receiver.trim() !== '') {
    message.receiver = receiver;
  }

  if (parameters && typeof parameters === 'object') {
    message.parameters = parameters;
  }

  if (cukCode && typeof cukCode === 'string' && cukCode.trim() !== '') {
    message.cukCode = cukCode;
  }

  return message;
}