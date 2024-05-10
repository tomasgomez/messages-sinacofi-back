import { Parameter } from '@/backend/entities/message/interface';
import { Message } from '@/backend/entities/message/message';

export function validateCreateMessage(data: any): Message | Error {
  const { messageCode, status, receiver, sender, parameters, cukCode, priority } = data;

  if (!messageCode || typeof messageCode !== 'string' || messageCode.trim() === '') {
    return new Error('Invalid messageCode');
  }

  let message: Message = new Message();
  let parametersMessage: Parameter[]  = [];

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


  if (cukCode && typeof cukCode === 'string' && cukCode.trim() !== '') {
    message.cukCode = cukCode.trim();
  }

  if (priority && typeof priority === 'number' || typeof priority === 'string') {
    message.priority = priority.toString();
  }

  if (parameters && typeof parameters === 'object') {
     parameters.forEach((element: any) => {
      let value: string = '';

      if (element && typeof element !== 'string' && 'value' in element) {
        value = String(element.value);
    }

      let parameter: Parameter =  {
        id: element.id ?? '',
        name: element.name ?? '',
        messageCode: element.messageCode ?? '',
        label: element.label ?? '',
        type: element.type ?? '',
        placeholder: element.placeholder ?? '',
        description: element.description ?? '',
        defaultValue: element.defaultValue ?? '',
        priority: element.priority ?? 0,
        value: value,
        properties: element.properties ?? '',
        validations: element.validations ?? '',
      }
      parametersMessage.push(parameter)
     });

    message.parameters = parametersMessage;
  }

  return message;
}
