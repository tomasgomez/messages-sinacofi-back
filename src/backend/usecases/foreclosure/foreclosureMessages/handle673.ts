import { Message, setStatus } from '@/backend/entities/message/message';
import { CUKRepository } from '@/backend/repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { MessageStatus } from '@/backend/entities/message/status';
import { updateLastMessage } from '@/backend/usecases/foreclosure/updateForeclosureLastMessage';
import { CUK } from '@/backend/entities/cuk/cuk';
import { User } from '@/backend/entities/user/user';


export async function handle673(cuk: CUK, message: Message, user: User, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise<Message | Error> {
    let updatedMessage: Message | Error;

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

    // Update the status of the message
    switch (status) {
        case MessageStatus.ENVIADO:
            if (message.setReceivedTime) {
                message.setReceivedTime();
            }
            message = setStatus(message, MessageStatus.BANDEJA_DE_ENTRADA);
            break;
        case MessageStatus.BANDEJA_DE_ENTRADA:

            message = setStatus(message, MessageStatus.ENVIADO);
            break;
    }
    
    return updatedMessage;
}

