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
  MessageTypes
} from '@/backend/entities/message/types';
import {
  isValidMessage,
} from '@/backend/utils/foreclosure';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { handle670 } from './foreclosureMessages/handle670';
import { handle671 } from './foreclosureMessages/handle671';
import { handle672 } from './foreclosureMessages/handle672';
import { handle673 } from './foreclosureMessages/handle673';

export async function handleForeclosure(cukRepository: CUKRepository, messageRepository: MessageRepository, cuk: CUK, message: Message): Promise < CUK | Message | Error > {
  try {

    /* Check if is a valid message for foreclosure */
    if (!isValidMessage(message)) {
      return new Error('Invalid message');
    }

    /* Depending on the message code, process the message */
    switch (message.messageCode) {

      /* ALZAMIENTO HIPOTECARIO */
      case (MessageTypes.ALZAMIENTO_HIPOTECARIO): {
        return handle670(cuk, message, cukRepository, messageRepository);
      }

      /* ACEPTACION DE AH */
      case (MessageTypes.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO): {
        return handle671(cuk, message, cukRepository, messageRepository);
      }

      /* RECHAZO DE AH */
      case (MessageTypes.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO): {
        return handle672(cuk, message, cukRepository, messageRepository);
      }

      /* NORMALIZACION */
      case (MessageTypes.AVISO_DE_CLIENTE_EN_NORMALIZACION): {
        return handle673(cuk, message, cukRepository, messageRepository);
      }

      /* 674 */
      case ('674'): {
        return handle673(cuk, message, cukRepository, messageRepository);
      }
      
      /* 675 */
      case ('675'): {
        return handle673(cuk, message, cukRepository, messageRepository);
      }

      default: {
        return new Error('Invalid message code');
      }
    }
  } catch (error: any) {
    console.error('Error creating foreclosure:', error);
    return error;
  }
}