import {
    Message
} from "@/backend/entities/message/message";
import {
    MessageRepository
} from "@/backend/interfaces/messageRepository";
import {
    getChileanTime
} from "@/backend/utils/functions";


// Create message function
export async function createMessage(repository: MessageRepository, message: Message): Promise < Message | Error > {
    try {
        // TSN, OSN, NSE, description, status,  creationDate, creationTime, receivedDate, receivedTime

        if (message.messageCode == "199") { //TODO: Cambiar por un enum
            message.description = "TEXTO LIBRE";
        } else {
            message.description = "TRANSFERENCIA DE FONDOS INDIVIDUAL";
        }

        /* Get the Chilean time */
        let response = getChileanTime();

        if (response instanceof Error) {
            return response;
        }

        let [dateString, time] = response;

        /* Set the creation date and time */
        message.creationDate = dateString;
        message.creationTime = time;

        if (message.status === "06") {
            message.receivedDate = dateString;
            message.receivedTime = time;
        }

        let messageResponse = await repository.create(message);

        /* TODO: Add this as a correlative */
        if (messageResponse instanceof Error) {
            return messageResponse;
        }

        if (messageResponse.id === undefined) {
            return new Error('No id returned');
        }

        let messageAux = new Message();

        messageAux.id = messageResponse.id;
        messageAux.TSN = messageResponse.id.toString().padStart(4, '0');
        messageAux.OSN = messageResponse.id.toString().padStart(4, '0');

        let messageUpdated = await repository.update(messageAux);
        /*  */

        return messageUpdated;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error creating message:', error);
        return error;
    }
}