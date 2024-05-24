import {
    Message
} from "@/backend/entities/message/message";
import {
    MessageRepository
} from "@/backend/repository/messageRepository";
import {
    getSchemaTypes
} from "@/backend/usecases/schema/getSchemaTypes";


// Create message function
export async function createMessage(repository: MessageRepository, message: Message, ): Promise < Message | Error > {
    try {

        // /* Get the schema types */
        // let schemaTypes = await getSchemaTypes({});

        // if (schemaTypes instanceof Error) {
        //     return schemaTypes;
        // }

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