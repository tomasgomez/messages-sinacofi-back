import { docUseCase } from "../docs/usecases";
import { Documents } from "@/backend/entities/message/interface";
import { Message } from "@/backend/entities/message/message";
import { MessageRepository } from "@/backend/repository/messageRepository";
import { MessageStatus } from "@/utils/messagesStatus";
import path from "path";


// Create message function
export async function updateMessage(repository: MessageRepository, message: Message): Promise < Message | Error > {
    try {
        let status = '';      

        if (message.statusCode && message.statusCode !== undefined && message.id !== undefined && message.setStatus) {
            
            status = message.statusCode;

            message.setStatus(status);
        }

        // Store the documents
        if(process.env.NEXT_PUBLIC_TEST_ENV !== "true"){
            let result = await storeDocs(message);

            if (result instanceof Error) {
                return result;
            }

            message = result;
        }

        // Update the status of the message
        switch (status) {
            case MessageStatus.ENVIADO:
                console.log("ENTRO EN EL UPDATE MESSAGE PARA ENVIAR")
                if (message.setReceivedTime) {
                    message.setReceivedTime();
                }
                if (message.setStatus) {
                    message.setStatus(MessageStatus.BANDEJA_DE_ENTRADA);
                }
                break;
            case MessageStatus.BANDEJA_DE_ENTRADA:
                if (message.setStatus) {
                    message.setStatus(MessageStatus.ENVIADO);
                }
                break;
        }

        delete message.statusCode;

        /* Update the message */
        let messageResponse = await repository.update(message);

        if (messageResponse instanceof Error) {
            return messageResponse;
        }

        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return error;
    }
}

export async function storeDocs(message: Message): Promise <Message | Error> {
    let docs: Documents[] = [];
     
    /* Check if the message has documents */
     if (message.documents && message.documents.length > 0) {      
        
        /* Store the documents */
        for (const doc of message.documents) {
            
            let cukCode = message.parameters?.filter(d => d.name == 'CUK');
            let messagePath = message.messageCode ? message.messageCode : '';

            if (cukCode && cukCode.length > 0 && cukCode[0].value != ''){
                messagePath = path.join(cukCode[0].value!, messagePath);
            }

            const docResponse = await docUseCase.storeDoc(doc, messagePath);
            
            // check response
            if (docResponse instanceof Error) {
                return docResponse;
            }
            // push doc
            docs.push(docResponse);
        }

        message.documents = docs;
    }

    return message;
}