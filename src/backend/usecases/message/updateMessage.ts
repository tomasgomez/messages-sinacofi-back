import {
    Message
} from "@/backend/entities/message/message";
import { prepareMessages } from "@/backend/handler/message/adapter/prepareMessages";
import {
    MessageRepository
} from "@/backend/repository/messageRepository";
import { MessageStatus } from "@/utils/messagesStatus";


// Create message function
export async function updateMessage(repository: MessageRepository, message: Message): Promise < Message | Error > {
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

        console.log("message", message.status);

        delete message.statusCode;

        /* Update the message */
        let messageResponse = await repository.update(message);

        if (messageResponse instanceof Error) {
            return messageResponse;
        }

        let messages = prepareMessages([messageResponse]);

        return messages;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return error;
    }
}