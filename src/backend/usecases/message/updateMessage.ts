import {
    Message
} from "@/backend/entities/message/message";
import {
    MessageRepository
} from "@/backend/repository/messageRepository";
import {
    MessageStatus
} from "@/backend/entities/message/status";


// Create message function
export async function updateMessage(repository: MessageRepository, message: Message): Promise < Message | Error > {
    try {
        /* If the message status is 05, create a new message with status 06 */
        if (message.status && message.status === MessageStatus.ENVIADO ) {
            if (message.setReceivedTime) {
                message.setReceivedTime();
            }
        }

        /* Update the message */
        let messageResponse = await repository.update(message);

        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return error;
    }
}