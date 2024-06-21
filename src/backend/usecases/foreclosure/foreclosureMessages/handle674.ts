import { Message } from '@/backend/entities/message/message';
import { CUKRepository } from '@/backend/repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { MessageStatus } from '@/backend/entities/message/status';
import { updateLastMessage } from '@/backend/usecases/foreclosure/updateForeclosureLastMessage';
import { CUK } from '@/backend/entities/cuk/cuk';
import { updateForclosure } from '../updateForeclosure';
import { ForeclosureStatus } from '@/backend/entities/cuk/codes';
import { MessageActions } from '@/backend/entities/message/actions';


export async function handle674(cuk: CUK, message: Message, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise<Message | Error> {
    let updatedMessage: Message | Error;
    
    let actions = []
    actions.push(MessageActions.SHOW_DETAIL)
    message.actions = actions.join(',')

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
        cuk.status = ForeclosureStatus.SENT_LIQUIDATION
        cuk.cukCode = message.cukCode;
        updateForclosure(cukRepository,messageRepository,cuk,message);
    }
    
    return updatedMessage;
}

