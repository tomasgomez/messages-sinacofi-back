import { Parameter } from '@/backend/entities/message/parameter';
import { Message } from '@/backend/entities/message/message';
import { processStringField } from '@/backend/utils/functions';
import { validateParameters } from './validateParameters';

export function validateCreateMessage(data: any): Message | Error {
  const { 
    messageCode, status, origin, destination, originArea, destinationArea,parameters, cukCode } = data;

  let message: Message = new Message();
  let parametersMessage: Parameter[]  = [];
  let cukCodeParam = '';

  // Set the message fields
  message.messageCode = processStringField(messageCode);
  message.origin = processStringField(origin);
  message.destination = processStringField(destination);
  message.originArea = processStringField(originArea);
  message.destinationArea = processStringField(destinationArea);
  message.cukCode = processStringField(cukCode);
  message.statusCode = status;

  // Validate parameters
  [parametersMessage, cukCodeParam] = validateParameters(messageCode, parameters);

  if (cukCodeParam !== '')
    message.cukCode = cukCodeParam;

  // Set the parameters
  message.parameters = parametersMessage;
  
  return message;
}