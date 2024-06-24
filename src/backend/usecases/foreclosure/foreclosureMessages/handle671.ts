import { Message } from '@/backend/entities/message/message';
import { CUKRepository } from '@/backend/repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { CUK } from '@/backend/entities/cuk/cuk';
import { updateLastMessage } from '@/backend/usecases/foreclosure/updateForeclosureLastMessage';
import { updateForclosure } from '../updateForeclosure';
import { ForeclosureStatus } from '@/backend/entities/cuk/codes';
import { User } from '@/backend/entities/user/user';

export async function handle671(cuk: CUK, message: Message, user: User, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise<Message | Error> {

    let updatedMessage: Message | Error;
    
    /* Update the last message */
    updatedMessage = await updateLastMessage(message, user, messageRepository, cukRepository);
    if (updatedMessage instanceof Error) {
        return updatedMessage;
    }

    let status = '';

    if (message.statusCode && message.statusCode !== undefined && message.id !== undefined && message.setStatus) {
            
        status = message.statusCode;

        message.setStatus(status);
    }

    if (message.cukCode && message.cukCode !== ''){
        cuk.status = ForeclosureStatus.ACCEPTED
        cuk.cukCode = message.cukCode;
        updateForclosure(cukRepository, messageRepository, cuk, message, user);
    }

    return updatedMessage;
}
