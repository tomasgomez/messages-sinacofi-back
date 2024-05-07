import { CUKRepository } from '../../repository/cukRepository';
import { CUK } from '../../entities/cuk/cuk';
import { Message } from '../../entities/message/message';
import { ICUK } from '@/backend/entities/cuk/interface';
import { MessageTypes } from '@/backend/entities/message/types';

export async function normalization(cukRepository: CUKRepository, cuk: CUK, message: Message): Promise<ICUK | Error> {
  try {
    if (!isValidMessage(message)) {
      throw new Error('Invalid message');
    }

    processMessageParameters(message.parameters, cuk);

    if (message.receiver)
    setCukDestination(cuk, message.receiver);

    if (message.status)
    setCukStatus(cuk, message.status);

    const createdCuk = await cukRepository.create(cuk);

    if (createdCuk instanceof Error) {
      throw createdCuk;
    }

    return createdCuk;
  } catch (error: any) {
    console.error('Error creating foreclosure:', error);
    return error;
  }
}

function isValidMessage(message: Message): boolean {
  return message.messageCode === MessageTypes.ALZAMIENTO_HIPOTECARIO && message.parameters && message.parameters.length > 0;
}

function processMessageParameters(parameters: any[], cuk: CUK): void {
  for (const parameter of parameters) {
    const paramConfig = getParameterConfig(parameter.name);
    if (!paramConfig || !parameter.name || !parameter.value || parameter.value === '' || parameter.name === '') {
      continue;
    }
    cuk[paramConfig.key as keyof CUK] = parameter.value;
    if (paramConfig.name) {
      cuk[paramConfig.name as keyof CUK] = parameter.value;
    }
  }
}

function getParameterConfig(parameterName: string): { key: string; name?: string } | undefined {
  return parameters[parameterName];
}

function setCukDestination(cuk: CUK, receiver: string): void {
  if (receiver) {
    cuk.institutionDestination = receiver;
    if (cuk.setCukCode) {
      cuk.setCukCode(receiver);
    }
  }
}

function setCukStatus(cuk: CUK, status: string): void {
  if (status) {
    cuk.status = status;
  }
}

const parameters: { [key: string]: { key: string; name?: string } } = {
  'descriptionTypeMessage': { key: 'description', name: 'name' },
  'emissionDate': { key: 'foreclosureDate' },
  'channel': { key: 'channel' },
  'buyer': { key: 'clientName' },
  'rutBuyer': { key: 'clientDni' }
};
