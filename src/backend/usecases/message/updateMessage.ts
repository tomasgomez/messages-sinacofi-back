import { Message } from "@/backend/entities/message";
import { MessageRepository } from "@/backend/interfaces/messageRepository";


// Create message function
export async function updateMessage(repository: MessageRepository, message: Message): Promise<Message | Error> {
    try {
        let messageResponse = await repository.update(message);
        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return error;
    }
}