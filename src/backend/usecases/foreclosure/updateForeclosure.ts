import { CUKRepository } from '../../repository/cukRepository';
import { CUK } from '../../entities/cuk/cuk';
import { Message } from '../../entities/message/message';
import { isValidMessage, processMessageParameters, setCukDestination } from '@/backend/utils/foreclosure';
import { ForeclosureStatus } from '@/backend/entities/cuk/codes';

export async function updateForclosure(cukRepository: CUKRepository, cuk: CUK, message: Message): Promise<CUK | Error> {
  try {

    switch (cuk.status) {
      case ForeclosureStatus.IN_PROCESS:
        cuk.status = ForeclosureStatus.IN_PROCESS;
        break;
      case ForeclosureStatus.APPROVED:
        /* Create message 672 */
        cuk.status = ForeclosureStatus.APPROVED;
        break;
      case ForeclosureStatus.REJECTED:
        /* Create message 671 */
        cuk.status = ForeclosureStatus.REJECTED;
        break;
      case ForeclosureStatus.START_NORMALIZATION:
        /* Create message 670 */
        cuk.status = ForeclosureStatus.START_NORMALIZATION;
        break;
      case ForeclosureStatus.END_NORMALIZATION:
        cuk.status = ForeclosureStatus.END_NORMALIZATION;
        break;
      case ForeclosureStatus.SIGN_IN_PROGRESS:
        cuk.status = ForeclosureStatus.SIGN_IN_PROGRESS;
        break;
      case ForeclosureStatus.SIGNED:
        cuk.status = ForeclosureStatus.SIGNED;
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
