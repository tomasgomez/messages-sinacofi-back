import {
  Message
} from '@/backend/entities/message/message';
import {
  CUKRepository
} from '@/backend/repository/cukRepository';
import {
  MessageRepository
} from '@/backend/repository/messageRepository';
import {
  processMessageParameters,
  setCukStatus,
} from '@/backend/utils/foreclosure';
import {
  createMessage
} from '@/backend/usecases/message/createMessage';
import {
  CUK
} from '@/backend/entities/cuk/cuk';
import {
  MessageStatus
} from '@/backend/entities/message/status';
import { MessageActions } from '@/backend/entities/message/actions';
import { updateMessage } from '../../message/updateMessage';


export async function handle670(cuk: CUK, message: Message, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise < Message | Error > {

  let actions = [];
  
  switch (message.statusCode) {
    case MessageStatus.ENVIADO: {
      updateMessage(messageRepository, message);
      break;
    }
    case MessageStatus.PREPARADO: default: {
      if (!cuk.cukCode) {
        if (cuk.setCukCode)
          cuk.setCukCode(message.origin ?? '');

        actions.push(MessageActions.SIGN);
        actions.push(MessageActions.CANCEL);

        message.actions = actions.join(',');

        const createdCuk = await cukRepository.create(cuk);
        
        if (createdCuk instanceof Error) {
          throw createdCuk;
        }

        if (cuk instanceof Error) {
          return cuk;
        }

        if (cuk.cukCode === undefined) {
          return new Error('No cuk code returned');
        }

        message.cukCode = cuk.cukCode;
      } else {
        message.cukCode = cuk.cukCode;
      }
      break;
    }
  }
  return await createMessage(messageRepository, message);
}