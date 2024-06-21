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
import { Parameter } from '@/backend/entities/message/parameter';


export async function handle670(cuk: CUK, message: Message, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise < Message | Error > {

  let actions = [];
  
  switch (message.statusCode) {
    case MessageStatus.ENVIADO: {
      actions.push(MessageActions.SHOW_DETAIL);
      actions.push(MessageActions.EDIT);
      actions.push(MessageActions.DELETE);
        
      message.actions = actions.join(',');

      console.log('Message:', message)

      updateMessage(messageRepository, message);

      cuk.status = MessageStatus.ENVIADO;

      cukRepository.update(cuk);

      break;
    }
    case MessageStatus.PREPARADO: default: {
      if (!cuk.cukCode) {
        if (cuk.setCukCode)
          cuk.setCukCode(message.origin ?? '');

        actions.push(MessageActions.SIGN);
        actions.push(MessageActions.EDIT);
        actions.push(MessageActions.DELETE);

        message.actions = actions.join(',');

        cuk.status = '-'

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
      
      message.parameters = message?.parameters?.map((parameter: Parameter) => {
        if (parameter.name === 'CUK') {
          parameter.value = cuk.cukCode;
        }
        return parameter;
      });

      } else {
        message.cukCode = cuk.cukCode;
      }
      break;
    }
  }
  return await createMessage(messageRepository, message);
}