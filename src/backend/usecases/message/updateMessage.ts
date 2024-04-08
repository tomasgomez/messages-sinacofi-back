import { Message } from "@/backend/entities/message";
import { MessageRepository } from "@/backend/interfaces/messageRepository";
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";


// Create message function
export async function updateMessage(repository: MessageRepository, message: Message): Promise<Message | Error> {
    try {
        if (message.status && message.status === "05") {
            let fetchedMessage = await repository.find(message, true, "1", "1");

            if (fetchedMessage instanceof Error) {
                return fetchedMessage;
            }

            if (fetchedMessage.length === 0) {
                return new Error("No message found");
            }

            let messageCopy = fetchedMessage[0];

            // Update message status
            messageCopy.status = "06";

            // Create message with different status and id
            let createdMessage = await repository.create(messageCopy);

            console.log("Created message: ", createdMessage);
        }
        let messageResponse = await repository.update(message);
        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return error;
    }
}