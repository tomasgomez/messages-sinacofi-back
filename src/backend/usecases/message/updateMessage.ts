import { Message } from "@/backend/entities/message";
import { MessageRepository } from "@/backend/interfaces/messageRepository";


// Create message function
export async function updateMessage(repository: MessageRepository, message: Message): Promise<Message | null> {
    try {
        let messageResponse = await repository.update(message);
        return messageResponse;
    } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return null;
    }
}