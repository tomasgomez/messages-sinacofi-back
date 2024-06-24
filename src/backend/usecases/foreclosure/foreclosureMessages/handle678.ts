import { Message, setStatus } from '@/backend/entities/message/message';
import { CUKRepository } from '@/backend/repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { updateLastMessage } from '@/backend/usecases/foreclosure/updateForeclosureLastMessage';
import { CUK } from '@/backend/entities/cuk/cuk';
import { updateForclosure } from '../updateForeclosure';
import { ForeclosureStatus } from '@/backend/entities/cuk/codes';
import { MessageTypes } from '@/backend/entities/message/types';
import { MessageStatus } from '@/backend/entities/message/status';
import { FilterMessage } from '@/backend/entities/message/filter';
import { User } from '@/backend/entities/user/user';


export async function handle678(cuk: CUK, message: Message, user: User, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise<Message | Error> {
    let updatedMessage: Message | Error;

    /* Find the last empty 679 message and delete it */
    let newMessage: FilterMessage = {
        detail: false
    }

    if (message.cukCode && message.cukCode !== '') {
        newMessage.cukCode = [message.cukCode];
    }

    newMessage.messageCode = [MessageTypes.CONFIRMACION_DE_PAGO_AH];
    newMessage.status = [MessageStatus.PREPARADO];

    let messageToDelete = await messageRepository.find(newMessage, false, false);

    if (messageToDelete instanceof Array && messageToDelete.length > 0) {
        messageRepository.delete(messageToDelete[0]);
    }

    /* Update the last message */
    updatedMessage = await updateLastMessage(message, user, messageRepository, cukRepository);

    if (updatedMessage instanceof Error) {
        return updatedMessage;
    }

    let status = '';

    if (message.statusCode && message.statusCode !== undefined && message.id !== undefined) {
            
        status = message.statusCode;

        message = setStatus(message, status);
    }

    if (message.cukCode && message.cukCode !== ''){

        /* Update the CUK status */
        cuk.status = ForeclosureStatus.SENT_REJECTION
        cuk.cukCode = message.cukCode;

        await updateForclosure(cukRepository, messageRepository, cuk, message, user);
    }
    
    return updatedMessage;
}

