import { Message } from '../../entities/message/message';

export function validateUpdateMessage(data: any): Message | Error {
  let message: Message = new Message()

  // Convert data to message object
  if (!data.id || !data.messageCode || !data.priority || !data.status || !data.sender || !data.receiver) {
    return new Error('Missing required fields');
  }

  message.id = data.id;
  message.messageCode = data.messageCode;
  message.priority = data.priority;
  message.status = data.status;
  message.sender = data.sender;
  message.receiver = data.receiver;
  
  if (data.parameters) {
    message.parameters = data.parameters;
  }

  return message;
}
