import { Message } from '../../entities/message/message';

export function validateCreateMessage(data: any): Message | Error {
  const { messageCode, status, receiver, sender, parameters, cukCode } = data;

  if (!messageCode || typeof messageCode !== 'string' || messageCode.trim() === '') {
    return new Error('Invalid messageCode');
  }

  let message: Message = new Message();
  message.messageCode = messageCode.trim();

  if (sender && typeof sender === 'string' && sender.trim() !== '') {
    message.sender = sender.trim();
  }

  if (status && typeof status === 'string' && status.trim() !== '') {
    message.status = status.trim();
  }

  if (receiver && typeof receiver === 'string' && receiver.trim() !== '') {
    message.receiver = receiver.trim();
  }

  if (parameters && typeof parameters === 'object') {
    message.parameters = parameters;
  }

  if (cukCode && typeof cukCode === 'string' && cukCode.trim() !== '') {
    message.cukCode = cukCode.trim();
  }

  return message;
}
