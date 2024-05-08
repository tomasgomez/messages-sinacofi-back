import { CUKRepository } from '../../repository/cukRepository';
import { CUK } from '../../entities/cuk/cuk';
import { Message } from '../../entities/message/message';
import { ICUK } from '@/backend/entities/cuk/interface';
import { isValidMessage, processMessageParameters, setCukDestination, setCukStatus } from '@/backend/utils/foreclosure';

export async function updateForclosure(cukRepository: CUKRepository, cuk: CUK, message: Message): Promise<ICUK | Error> {
  try {
    if (!isValidMessage(message)) {
      throw new Error('Invalid message');
    }

    processMessageParameters(message.parameters, cuk);

    setCukDestination(cuk, message.receiver);

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
