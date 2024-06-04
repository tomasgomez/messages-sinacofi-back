import { Parameter } from '@/backend/entities/message/parameter';

export function validateParameters(messageCode: string, parameters: any): [Parameter[], string] {
  let parametersMessage: Parameter[]  = [];
  let cukCode = '';

  // Add parameters to the message
  if (parameters && typeof parameters === 'object') {
    parameters.find((element: any) => {
      if (element.name === 'CUK') {
        cukCode = element.value;
      }
    });

    let counter = 0;
     parameters.forEach((element: any) => {
      let value = (typeof element.value === 'string') ? element.value : element.value?.toString() ?? '';

      let parameter: any =  {
        name: element.name ?? '',
        label: element.name ?? '',
        messageCode: messageCode ?? '',
        type: element.type ?? '',
        placeholder: element.placeholder ?? '',
        description: element.description ?? '',
        defaultValue: element.value ?? '',
        priority: counter,
        value: value,
        validations: JSON.stringify(element.validations),
      };

      if (cukCode)
        parameter.cukCode = cukCode;

      parametersMessage.push(parameter)
      counter++;
     });
  }

  return [parametersMessage, cukCode];
}