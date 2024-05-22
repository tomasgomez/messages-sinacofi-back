import {
    Message
} from "@/backend/entities/message/message";
import { prepareMessages } from "@/backend/handler/message/adapter/prepareMessages";
import {
    MessageRepository
} from "@/backend/repository/messageRepository";


// Create message function
export async function updateMessage(repository: MessageRepository, message: Message): Promise < Message | Error > {
    try {
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