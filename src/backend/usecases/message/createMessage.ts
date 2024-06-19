import {
    Message
} from "@/backend/entities/message/message";
import {
    MessageRepository
} from "@/backend/repository/messageRepository";
import { getSchema } from "../schema/getSchema";
import { Filter } from "@/backend/entities/schema/filter";
import { adaptParameters } from "@/backend/entities/message/parameter";

// Create message function
export async function createMessage(repository: MessageRepository, message: Message, ): Promise < Message | Error > {
    try {

        if (!message.messageCode) {
            return new Error('Message code is required');
        }

        let filter: Filter = {
            messageCode: [message.messageCode]
        }

        let messageSchema = await getSchema(filter);

        if (messageSchema instanceof Error) {
            return new Error('Message schema not found');
        }

        message.parameters = adaptParameters(message, messageSchema);

        let messageResponse = await repository.create(message);

        /* Check if the response is an error */
        if (messageResponse instanceof Error) {
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