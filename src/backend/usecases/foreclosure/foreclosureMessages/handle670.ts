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
import { User } from '@/backend/entities/user/user';
import { updateMessage } from '../../message/updateMessage';
import { Parameter } from '@/backend/entities/message/parameter';


export async function handle670(cuk: CUK, message: Message, user: User, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise < Message | Error > {

  switch (message.statusCode) {
    case MessageStatus.ENVIADO: {

      updateMessage(messageRepository, message);

      cuk.status = MessageStatus.ENVIADO;

      cukRepository.update(cuk);

      break;
    }
    case MessageStatus.PREPARADO: default: {

      if (!cuk.cukCode && !message.cukCode) {
        if (cuk.setCukCode)
          cuk.setCukCode(message.origin ?? '');

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
      
        
      } else if (cuk.cukCode){
        message.cukCode = cuk.cukCode;
      }
      break;
    }
  }
  message.parameters = message?.parameters?.map((parameter: Parameter) => {
    if (parameter.name === 'CUK') {
      parameter.value = cuk.cukCode;
    }
    return parameter;
  });
  return await createMessage(messageRepository, message, user);
}