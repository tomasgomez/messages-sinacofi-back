import { Message } from "@/backend/entities/message";
import { MessageRepository } from "@/backend/interfaces/messageRepository";


// Create message function
export async function createMessage(repository: MessageRepository, message: Message): Promise<Message | Error> {
    try {
        // TSN, OSN, NSE, description, status,  creationDate, creationTime, receivedDate, receivedTime
        let messageResponse = await repository.create(message);     
        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error creating message:', error);
        return error;
    }
}