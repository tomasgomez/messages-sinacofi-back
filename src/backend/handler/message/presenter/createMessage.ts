import { Parameter } from '@/backend/entities/message/parameter';
import { Message } from '@/backend/entities/message/message';

export function validateCreateMessage(data: any): Message | Error {
  const { messageCode, parameters, cukCode } = data;

  if (!messageCode || typeof messageCode !== 'string' || messageCode.trim() === '') {
    return new Error('Invalid messageCode');
  }

  let message: Message = new Message();
  let parametersMessage: Parameter[]  = [];

  message.messageCode = messageCode.trim();


  if (cukCode && typeof cukCode === 'string' && cukCode.trim() !== '') {
    message.cukCode = cukCode.trim();
  }

  if (parameters && typeof parameters === 'object') {
    let counter = 0;
     parameters.forEach((element: any) => {
      let value = (typeof element.value === 'string') ? element.value : element.value?.toString() ?? '';

      if (element.name === 'CUK') {
        message.cukCode = value;
      }

      let parameter: Parameter =  {
        messageId: '',
        id: element.id ?? '',
        name: element.name ?? '',
        messageCode: element.messageCode ?? '',
        label: element.label ?? '',
        type: element.type ?? '',
        placeholder: element.placeholder ?? '',
        description: element.description ?? '',
        defaultValue: element.defaultValue ?? '',
        priority: counter,
        value: value,
        validations: element.validations ?? '',
      }
      parametersMessage.push(parameter)
      counter++;
     });

    message.parameters = parametersMessage;
  }

  return message;
}
