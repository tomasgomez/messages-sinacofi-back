import { Message } from "@/backend/entities/message";
import { MessageRepository } from "@/backend/interfaces/messageRepository";


// Create message function
export async function createMessage(repository: MessageRepository, message: Message): Promise<Message | Error> {
    try {
        // TSN, OSN, NSE, description, status,  creationDate, creationTime, receivedDate, receivedTime

        if (message.messageCode == "199") { //TODO: Cambiar por un enum
            message.description = "TEXTO LIBRE";
        } else {
            message.description = "TRANSFERENCIA DE FONDOS INDIVIDUAL";
        }

        message.status = "01" //TODO: Cambiar por un enum

        message.creationDate = new Date().toISOString().slice(0, 10);
        message.creationTime = new Date().toISOString().slice(11, 19);

        let messageResponse = await repository.create(message);  


        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error creating message:', error);
        return error;
    }
}