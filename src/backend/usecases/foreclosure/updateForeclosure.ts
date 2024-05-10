import { CUKRepository } from '../../repository/cukRepository';
import { CUK } from '../../entities/cuk/cuk';
import { Message } from '../../entities/message/message';
import { isValidMessage, processMessageParameters, setCukDestination } from '@/backend/utils/foreclosure';
import { ForeclosureStatus } from '@/backend/entities/cuk/codes';
import { createMessage } from '../message/createMessage';
import { handleForeclosure } from './handleForeclosure';
import { MessageTypes } from '@/backend/entities/message/types';
import { getSchema } from '../schema/getSchema';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { MessageStatus } from '@/backend/entities/message/status';

export async function updateForclosure(cukRepository: CUKRepository, messageRepository: MessageRepository, cuk: CUK, message: Message): Promise<CUK | Error> {
  try {
    if (!cuk) {
      throw new Error('Invalid CUK');
    }

    switch (cuk.status) {
      case ForeclosureStatus.IN_PROCESS:
        cuk.status = ForeclosureStatus.IN_PROCESS;
        break;

      /* 672 */
      case ForeclosureStatus.APPROVED:
        cuk.status = ForeclosureStatus.APPROVED;

        let messageStatus = MessageStatus.PREPARADO;

        // let schema = await getSchema(MessageTypes.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO, cuk.cukCode ?? '');

        // if (schema instanceof Error) {
        //   throw schema;
        // }

        // const message = await createMessage(messageRepository, schema);


        break;

      /*  671 */
      case ForeclosureStatus.REJECTED:
        cuk.status = ForeclosureStatus.REJECTED;
        break;

      case ForeclosureStatus.START_NORMALIZATION:
        /* 670 */
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
