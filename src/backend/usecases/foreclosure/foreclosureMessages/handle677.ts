import { Message } from '@/backend/entities/message/message';
import { CUKRepository } from '@/backend/repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { MessageTypes } from '@/backend/entities/message/types';
import { updateLastMessage } from '@/backend/usecases/foreclosure/updateForeclosureLastMessage';
import { CUK } from '@/backend/entities/cuk/cuk';
import { updateForclosure } from '../updateForeclosure';
import { ForeclosureStatus } from '@/backend/entities/cuk/codes';
import { createMessage } from '../../message/createMessage';


export async function handle677(cuk: CUK, message: Message, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise<Message | Error> {
    let updatedMessage: Message | Error;

    /* Update the last message */
    updatedMessage = await updateLastMessage(message, messageRepository, cukRepository);

    if (updatedMessage instanceof Error) {
        return updatedMessage;
    }

    let status = '';

    if (message.statusCode && message.statusCode !== undefined && message.id !== undefined && message.setStatus) {
            
        status = message.statusCode;

        message.setStatus(status);
    }

    if (message.cukCode && message.cukCode !== ''){

        let rejectMessage, confirmMessage: Message;
        
        rejectMessage = new Message();
        confirmMessage = new Message();

        rejectMessage.origin = message.destination;
        rejectMessage.destination = message.origin;
        rejectMessage.cukCode = cuk.cukCode;
        rejectMessage.messageCode = MessageTypes.RECHAZO_DE_PAGO_AH
  
        await createMessage(messageRepository, rejectMessage);

        confirmMessage.origin = message.destination;
        confirmMessage.destination = message.origin;
        confirmMessage.cukCode = cuk.cukCode;
        confirmMessage.messageCode = MessageTypes.CONFIRMACION_DE_PAGO_AH

        await createMessage(messageRepository, confirmMessage);
        
        cuk.status = ForeclosureStatus.PAYMENT
        cuk.cukCode = message.cukCode;

        await updateForclosure(cukRepository,messageRepository,cuk,message);
    }
    
    return updatedMessage;
}

