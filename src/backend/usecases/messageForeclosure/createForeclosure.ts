import {
  CUKRepository
} from '../../repository/cukRepository';
import {
  CUK
} from '../../entities/cuk/cuk';
import {
  Message
} from '../../entities/message/message';
import {
  ICUK
} from '@/backend/entities/cuk/interface';
import {
  MessageTypes
} from '@/backend/entities/message/types';


// Get message function
export async function createForeclosure(cukRepository: CUKRepository, cuk: CUK, message: Message): Promise < ICUK | Error > {
  try {

    //TODO: Check statuses and it definitions
    
    if (message.messageCode !== MessageTypes.ALZAMIENTO_HIPOTECARIO || message.parameters === undefined || message.parameters.length === 0) {
      throw new Error('Invalid message');
    }

    /* Process message parameters based on the mapping */
    for (const parameter of message.parameters) {

      const paramConfig = parameters[parameter.name];

      if (!paramConfig) {
        continue; // Skip if parameter is not mapped
      }

      if (parameter.name === undefined || parameter.value === undefined || parameter.value === '' || parameter.name === '') {
        continue;
      }

      cuk[paramConfig.key as keyof CUK] = parameter.value;

      if (paramConfig.name) {
        cuk[paramConfig.name as keyof CUK] = parameter.value;
      }
    }

    cuk.institutionDestination = message.receiver;
    cuk.status = message.status;

    if (message.receiver !== undefined && message.receiver !== '' && message.receiver !== null) {
      cuk.institutionDestination = message.receiver;

      if (cuk.setCukCode !== undefined) {
        cuk.setCukCode(message.receiver);
      }
    }

    /* Get the CUKs */
    const createdCuk = await cukRepository.create(cuk);

    if (createdCuk instanceof Error) {
      throw createdCuk;
    }

    return createdCuk;

  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}

/* Define mapping of parameter names to cuk keys */
const parameters: { [key: string]: { key: string; name?: string } /* Define types */ } = {
  /* Define mapping */
  'descriptionTypeMessage': { key: 'description', name: 'name' },
  'emissionDate': { key: 'foreclosureDate' },
  'channel': { key: 'channel' },
  'buyer': { key: 'clientName' },
  'rutBuyer': { key: 'clientDni' }
};