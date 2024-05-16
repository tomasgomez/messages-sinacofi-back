import { Message } from '@/backend/entities/message/message';
import { CUKRepository } from '@/backend/repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { CUK } from '@/backend/entities/cuk/cuk';
import { updateLastMessage } from '@/backend/usecases/foreclosure/updateForeclosureLastMessage';
import { MessageStatus } from '@/backend/entities/message/status';


export async function handle671(cuk: CUK, message: Message, cukRepository: CUKRepository, messageRepository: MessageRepository): Promise<Message | Error> {

    let updatedMessage: Message | Error;

    /* Update the last message */
    updatedMessage = await updateLastMessage(message, messageRepository, cukRepository);

    if (updatedMessage instanceof Error) {
        return updatedMessage;
    }

    /* If the message status is 05, create a new message with status 06 */
    if (updatedMessage.status && updatedMessage.status === MessageStatus.ENVIADO ) {
        if (updatedMessage.setReceivedTime) {
            updatedMessage.setReceivedTime();
        }

        let duplicatedMessage = await messageRepository.duplicateMessage(updatedMessage);

        if (duplicatedMessage instanceof Error) {
            return duplicatedMessage;
        }
    }
    
    return updatedMessage;
}
