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

        const chileSantiagoDate = new Date().toLocaleString('en-US', { timeZone: 'America/Santiago' });

        message.creationDate = chileSantiagoDate.slice(0, 10);
        message.creationTime = chileSantiagoDate.slice(11, 19);

        if (message.status === "06") {
            message.receivedDate = chileSantiagoDate.slice(0, 10);
            message.receivedTime = chileSantiagoDate.slice(11, 19);
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
        messageAux.TSN = messageResponse.id.toString().padStart(10, '0');
        messageAux.OSN = messageResponse.id.toString().padStart(10, '0');
        messageAux.NSE = messageResponse.id.toString().padStart(10, '0');

        messageResponse = await repository.update(messageAux);
        /*  */
        
        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error creating message:', error);
        return error;
    }
}