import { CUKRepository } from '../../repository/cukRepository';
import { CUK } from '../../entities/cuk/cuk';
import { Message } from '../../entities/message/message';
import { isValidMessage, processMessageParameters, setCukDestination, setCukStatus } from '@/backend/utils/foreclosure';

export async function normalization(cukRepository: CUKRepository, cuk: CUK, message: Message): Promise<CUK | Error> {
  try {
    if (!isValidMessage(message)) {
      return new Error('Invalid message');
    }

    processMessageParameters(message.parameters, cuk);

    if (message.receiver)
    setCukDestination(cuk, message.receiver);

    if (message.status)
    setCukStatus(cuk, message.status);

    const createdCuk = await cukRepository.create(cuk);

    if (createdCuk instanceof Error) {
      return createdCuk;
    }

    return createdCuk;
  } catch (error: any) {
    console.error('Error creating foreclosure:', error);
    return error;
  }
}