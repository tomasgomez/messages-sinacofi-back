import {
    Message
} from "@/backend/entities/message/message";
import {
    MessageRepository
} from "@/backend/repository/messageRepository";
import {
    validateMessage
} from "@/backend/usecases/message/validateMessage";
import { User } from "@/backend/entities/user/user";


// Create message function
export async function createMessage(repository: MessageRepository, message: Message, user: User): Promise < Message | Error > {
    try {
        
        if (message.setTime) message.setTime();
        
        if (!message.messageCode) {
            return new Error('Message code is required');
        }

        let validateMessageResponse = await validateMessage(repository, message, user);

        if (validateMessageResponse instanceof Error) {
            console.error('Error validating message:', validateMessageResponse.message);
            return validateMessageResponse;
        }
        
        let messageResponse = await repository.create(validateMessageResponse);
        
        /* Check if the response is an error */
        if (messageResponse instanceof Error) {
            console.error('Error creating message:', messageResponse.message);
            return messageResponse;
        }
        
        /* Check if the id is undefined */
        if (messageResponse.id === undefined) {
            return new Error('No id returned');
        }
        
        return messageResponse;
    } catch (error: any) {
        console.error('Error creating message:', error);
        return error;
    }
}
