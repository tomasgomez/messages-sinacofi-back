import { isForeclosureMessageCode } from "@/backend/entities/cuk/codes";
import { CUK } from "@/backend/entities/cuk/cuk";
import {
    Message
} from "@/backend/entities/message/message";
import {
    MessageRepository
} from "@/backend/repository/messageRepository";
import { MessageStatus } from "@/utils/messagesStatus";
import { updateForclosure } from "../foreclosure/updateForeclosure";
import { CUKRepository } from "@/backend/repository/cukRepository";


// Create message function
export async function signMessage(repository: MessageRepository, cukRepository: CUKRepository, message: Message): Promise < Message | Error > {
    try {
        let status = '';      

        if (message.statusCode && message.statusCode !== undefined && message.id !== undefined && message.setStatus) {
            
            status = message.statusCode;

            message.setStatus(status);
        }

        // Update the status of the message
        switch (status) {
            case MessageStatus.ENVIADO:
                if (message.setReceivedTime) {
                    message.setReceivedTime();
                }
                if (message.setStatus) {
                    message.setStatus(MessageStatus.BANDEJA_DE_ENTRADA);
                }
                break;
            case MessageStatus.BANDEJA_DE_ENTRADA:
                if (message.setStatus) {
                    message.setStatus(MessageStatus.ENVIADO);
                }
                break;
        }

        delete message.statusCode;

        /* Update the message */
        let messageResponse = await repository.update(message);

        if (messageResponse instanceof Error) {
            return messageResponse;
        }

        if (message.messageCode && isForeclosureMessageCode(message.messageCode)) {
            let cuk = new CUK();
            cuk.cukCode = message.cukCode;

            await updateForclosure(cukRepository, repository, cuk, message);
        }

        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return error;
    }
}