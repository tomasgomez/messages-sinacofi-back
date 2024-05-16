import {
    Message
} from "@/backend/entities/message/message";
import {
    MessageRepository
} from "@/backend/repository/messageRepository";
import {
    MessageStatus
} from "@/backend/entities/message/status";
import { docUseCase } from "../docs/usecases";
import { Documents } from "@/backend/entities/message/interface";


// Create message function
export async function updateMessage(repository: MessageRepository, message: Message): Promise < Message | Error > {
    try {
        /* If the message status is 05, create a new message with status 06 */
        if (message.status && message.status === MessageStatus.ENVIADO ) {
            if (message.setReceivedTime) {
                message.setReceivedTime();
            }

            let newMessage = await repository.duplicateMessage(message);

            if (newMessage instanceof Error) {
                return newMessage;
            }
        }

        /* Check if the message has documents */
        if (message.documents && message.documents.length > 0) {

            let docs: Documents[] = [];
            /* Store the documents */
            for (const doc of message.documents) {
                const docResponse = await docUseCase.storeDoc(doc);
                // check response
                if (docResponse instanceof Error) {
                    return docResponse;
                }
                // push doc
                docs.push(docResponse);
            }

            message.documents = docs;
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