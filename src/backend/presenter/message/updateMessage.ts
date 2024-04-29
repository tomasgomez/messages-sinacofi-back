import { Message } from '../../entities/message/message';

export function validateUpdateMessage(data: any): Message | Error {
  let message: Message = new Message()

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

  return message;
}