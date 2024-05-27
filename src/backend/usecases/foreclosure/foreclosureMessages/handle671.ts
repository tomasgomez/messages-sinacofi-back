import { Message } from '@/backend/entities/message/message';
import { CUKRepository } from '@/backend/repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { CUK } from '@/backend/entities/cuk/cuk';
import { updateLastMessage } from '@/backend/usecases/foreclosure/updateForeclosureLastMessage';
import { MessageStatus } from '@/backend/entities/message/status';
import { updateForclosure } from '../updateForeclosure';
import { ForeclosureStatus } from '@/backend/entities/cuk/codes';


export async function handle671(cuk: CUK, message: Message, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise<Message | Error> {

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

    if (cuk.status && cuk.status !== ''){
        delete message.statusCode;

        cuk.status = ForeclosureStatus.ACCEPTED
        updateForclosure(cukRepository,messageRepository,cuk,message);
    }

    return updatedMessage;
}
