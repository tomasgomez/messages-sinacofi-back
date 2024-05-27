import { Parameter } from '@/backend/entities/message/parameter';
import { Message } from '@/backend/entities/message/message';
import { processStringField } from '@/backend/utils/functions';

export function validateCreateMessage(data: any): Message | Error {
  const { 
    messageCode, status, origin, destination, originArea, destinationArea,parameters, cukCode } = data;

  let message: Message = new Message();
  let parametersMessage: Parameter[]  = [];

  // Set the message fields
  message.messageCode = processStringField(messageCode);
  message.origin = processStringField(origin);
  message.destination = processStringField(destination);
  message.originArea = processStringField(originArea);
  message.destinationArea = processStringField(destinationArea);
  message.cukCode = processStringField(cukCode);
  message.statusCode = status;

  // Add parameters to the message
  if (parameters && typeof parameters === 'object') {
    let counter = 0;
     parameters.forEach((element: any) => {
      let value = (typeof element.value === 'string') ? element.value : element.value?.toString() ?? '';

      if (element.name === 'CUK') {
        message.cukCode = value;
      }

      if (element.name === 'bank' || element.name === 'bank_2') {
        value = message.destination;
      }

      let parameter: Parameter =  {
        name: element.name ?? '',
        label: element.name ?? '',
        messageCode: message.messageCode ?? '',
        type: element.type ?? '',
        placeholder: element.placeholder ?? '',
        description: element.description ?? '',
        defaultValue: element.value ?? '',
        priority: counter,
        value: value,
        validations: JSON.stringify(element.validations),
      }
      parametersMessage.push(parameter)
      counter++;
     });

    message.parameters = parametersMessage;
  }

  return message;
}
