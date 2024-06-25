import { docUseCase } from "../docs/usecases";
import { Documents } from "@/backend/entities/message/interface";
import { Message, setStatus } from "@/backend/entities/message/message";
import { MessageRepository } from "@/backend/repository/messageRepository";
import { MessageStatus } from "@/utils/messagesStatus";
import path from "path";
import { validateMessage } from "./validateMessage";
import { User } from "@/backend/entities/user/user";


// Create message function
export async function updateMessage(repository: MessageRepository, message: Message, user: User): Promise < Message | Error > {
    try {
        let status = '';      

        if (message.statusCode && message.statusCode !== undefined && message.id !== undefined) {
            
            status = message.statusCode;

            message = setStatus(message, status);
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
                if (message.setReceivedTime) {
                    message.setReceivedTime();
                }

                message = setStatus(message, MessageStatus.BANDEJA_DE_ENTRADA);
                break;
            case MessageStatus.BANDEJA_DE_ENTRADA:
                message = setStatus(message, MessageStatus.ENVIADO);
                break;
        }

        delete message.statusCode;

        let validateMessageResponse = await validateMessage(repository, message, user);

        if (validateMessageResponse instanceof Error) {
            return validateMessageResponse;
        }

        let { previousMessageCode, ...rest} = {
            ...message,
            ...validateMessageResponse,
            id: message.id
        }

        message = rest

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