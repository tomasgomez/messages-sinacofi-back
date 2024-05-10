import { CUKRepository } from '../../repository/cukRepository';
import { CUK } from '../../entities/cuk/cuk';
import { Message } from '../../entities/message/message';
import { ICUK } from '@/backend/entities/cuk/interface';
import { isValidMessage, processMessageParameters, setCukDestination } from '@/backend/utils/foreclosure';
import { foreclosureStatus } from '@/backend/entities/cuk/codes';

export async function updateForclosure(cukRepository: CUKRepository, cuk: CUK, message: Message): Promise<CUK | Error> {
  try {
    if (!isValidMessage(message)) {
      throw new Error('Invalid message');
    }

    processMessageParameters(message.parameters, cuk);

    setCukDestination(cuk, message.receiver);

    // setCukStatus(cuk, message.status);

    switch (cuk.status) {
      case foreclosureStatus.IN_PROCESS:
        cuk.status = foreclosureStatus.IN_PROCESS;
        break;
      case foreclosureStatus.APPROVED:
        /* Create message 672 */
        cuk.status = foreclosureStatus.APPROVED;
        break;
      case foreclosureStatus.REJECTED:
        /* Create message 671 */
        cuk.status = foreclosureStatus.REJECTED;
        break;
      case foreclosureStatus.START_NORMALIZATION:
        /* Create message 670 */
        cuk.status = foreclosureStatus.START_NORMALIZATION;
        break;
      case foreclosureStatus.END_NORMALIZATION:
        cuk.status = foreclosureStatus.END_NORMALIZATION;
        break;
      case foreclosureStatus.SIGN_IN_PROGRESS:
        cuk.status = foreclosureStatus.SIGN_IN_PROGRESS;
        break;
      case foreclosureStatus.SIGNED:
        cuk.status = foreclosureStatus.SIGNED;
        break;
      default:
        throw new Error('Invalid status');
    }
    const createdCuk = await cukRepository.update(cuk);

    if (createdCuk instanceof Error) {
      throw createdCuk;
    }

    return createdCuk;
  } catch (error: any) {
    console.error('Error creating foreclosure:', error);
    return error;
  }
}
