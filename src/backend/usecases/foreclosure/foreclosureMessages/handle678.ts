import { Message } from '@/backend/entities/message/message';
import { CUKRepository } from '@/backend/repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { updateLastMessage } from '@/backend/usecases/foreclosure/updateForeclosureLastMessage';
import { CUK } from '@/backend/entities/cuk/cuk';
import { updateForclosure } from '../updateForeclosure';
import { ForeclosureStatus } from '@/backend/entities/cuk/codes';
import { MessageTypes } from '@/backend/entities/message/types';


export async function handle678(cuk: CUK, message: Message, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise<Message | Error> {
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
        cuk.status = ForeclosureStatus.SENT_REJECTION
        cuk.cukCode = message.cukCode;

        let newMessage = new Message();

        newMessage.cukCode = message.cukCode;
        newMessage.messageCode = MessageTypes.RECHAZO_DE_PAGO_AH;

        messageRepository.delete(newMessage);

        await updateForclosure(cukRepository,messageRepository,cuk,message);
    }
    
    return updatedMessage;
}

