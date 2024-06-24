import { Message } from '@/backend/entities/message/message';
import { CUKRepository } from '@/backend/repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { updateLastMessage } from '@/backend/usecases/foreclosure/updateForeclosureLastMessage';
import { CUK } from '@/backend/entities/cuk/cuk';
import { updateForclosure } from '../updateForeclosure';
import { ForeclosureStatus } from '@/backend/entities/cuk/codes';
import { MessageActions } from '@/backend/entities/message/actions';
import { updateMessage } from '../../message/updateMessage';
import { MessageTypes } from '@/backend/entities/message/types';
import { getMessage } from '../../message/getMessage';
import { FilterMessage } from '@/backend/entities/message/filter';
import { User } from '@/backend/entities/user/user';


export async function handle672(cuk: CUK, message: Message,user: User, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise<Message | Error> {
    let updatedMessage: Message | Error;

    /* Update the last message */
    updatedMessage = await updateLastMessage(message,user, messageRepository, cukRepository);

    if (updatedMessage instanceof Error) {
        return updatedMessage;
    }
    
    let status = '';

    if (message.statusCode && message.statusCode !== undefined && message.id !== undefined && message.setStatus) {
            
        status = message.statusCode;

        message.setStatus(status);
    }
    
    if (message.cukCode && message.cukCode !== ''){
        cuk.status = ForeclosureStatus.REJECTED
        cuk.cukCode = message.cukCode;
        updateForclosure(cukRepository, messageRepository, cuk, message, user);

        
        let filter: FilterMessage = {
            cukCode: [cuk.cukCode],
            messageCode: [MessageTypes.ALZAMIENTO_HIPOTECARIO],
        }
        
        let fetchMessage = await getMessage(messageRepository, filter);
        
        if (!(fetchMessage instanceof Error) && fetchMessage.length > 0) {
            let message670: Message = {
                messageCode: MessageTypes.ALZAMIENTO_HIPOTECARIO,
                cukCode: cuk.cukCode,
                actions: [MessageActions.SHOW_DETAIL, MessageActions.DUPLICATE].join(','),
            }

            message670.id = fetchMessage[0].id;
            message670.previousMessageCode = MessageTypes.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO;

            await updateMessage(messageRepository, message670);
        }
    }

    return updatedMessage;
}

