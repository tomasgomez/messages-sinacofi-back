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
export async function updateMessage(repository: MessageRepository, message: Message): Promise < Message | Error > {
    try {

        /* If the message status is 05, create a new message with status 06 */
        if (message.status && message.status === "05") {
            let messageId = new Message();

            messageId.id = message.id;

            /* Fetch the message with the given id */
            let fetchedMessage = await repository.find(messageId, true, "0", "0"); //TODO: copy the message with different status

            if (fetchedMessage instanceof Error) {
                return fetchedMessage;
            }
            if (fetchedMessage.length === 0) {
                return new Error("No message found");
            }

            /* Copy the fetched message */
            let messageCopy = fetchedMessage[0];

            /* Update the status of the message */
            messageCopy.status = "06";

            /* Get the Chilean time */
            let response = getChileanTime();

            if (response instanceof Error) {
                return response;
            }

            let [dateString, time] = response;

            messageCopy.receivedDate = dateString;
            messageCopy.receivedTime = time;

            if (messageCopy.id !== undefined) {
                messageCopy.NSE = messageCopy.id.toString().padStart(4, '0');
            }

            /* Delete the id of the message */
            delete messageCopy.id;

            

            /* Create the message with the updated status */
            let createdMessage = await repository.create(messageCopy);

            if (createdMessage instanceof Error) {
                return createdMessage;
            }
        }

        /* Get the Chilean time */
        let response = getChileanTime();

        if (response instanceof Error) {
            return response;
        }

        let [dateString, time] = response;

        if (message.id !== undefined) {
            message.NSE = message.id.toString().padStart(4, '0');
        }
        message.receivedDate = dateString;
        message.receivedTime = time;

        /* Update the message */
        let messageResponse = await repository.update(message);

        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return error;
    }
}