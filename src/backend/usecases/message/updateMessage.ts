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
        if (message.statusId && message.statusId === MessageStatus.ENVIADO ) {
            if (message.setReceivedTime) {
                message.setReceivedTime();
            }

            let newMessage = await repository.duplicateMessage(message);

            if (newMessage instanceof Error) {
                return newMessage;
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