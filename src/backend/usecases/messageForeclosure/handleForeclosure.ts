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
import {
  normalization
} from './normalization';
import {
  isValidMessage,
  processMessageParameters,
  setCukDestination,
  setCukStatus
} from '@/backend/utils/foreclosure';

export async function handleForeclosure(cukRepository: CUKRepository, cuk: CUK, message: Message): Promise < ICUK | Error > {
  try {
    if (!isValidMessage(message)) {
      throw new Error('Invalid message');
    }

    console.log('Creating foreclosure:', message);

    switch (message.messageCode) {

      /* ALZAMIENTO HIPOTECARIO */
      case (MessageTypes.ALZAMIENTO_HIPOTECARIO): {
        processMessageParameters(message.parameters, cuk);
        setCukDestination(cuk, message.receiver);
        setCukStatus(cuk, message.status);

        const createdCuk = await cukRepository.create(cuk);
        if (createdCuk instanceof Error) {
          throw createdCuk;
        }

        return createdCuk;
      }

      /* ACEPTACION DE ALZAMIENTO HIPOTECARIO */
      case (MessageTypes.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO): {

      }

      /* AVISO DE CLIENTE EN NORMALIZACION */
      case (MessageTypes.AVISO_DE_CLIENTE_EN_NORMALIZACION): {
        normalization(cukRepository, cuk, message);
      }
      default: {
        throw new Error('Invalid message code');
      }
    }
  } catch (error: any) {
    console.error('Error creating foreclosure:', error);
    return error;
  }
}