import {
    CUK
} from "@/backend/entities/cuk/cuk";
import {
    Message
} from "@/backend/entities/message/message";
import {
    MessageRepository
} from "@/backend/repository/messageRepository";
import {
    MessageStatus
} from "@/utils/messagesStatus";
import {
    updateForclosure
} from "../foreclosure/updateForeclosure";
import {
    CUKRepository
} from "@/backend/repository/cukRepository";
import {
    MessageTypes
} from "@/backend/entities/message/types";
import {
    ForeclosureStatus
} from "@/backend/entities/cuk/codes";

import { storeDocs } from "./updateMessage";


// Create message function
export async function signMessage(repository: MessageRepository, cukRepository: CUKRepository, message: Message, dni: string, name: string): Promise < Message | Error > {
    try {        
        
        message.parameters = message.parameters?.map(param=> {
            if(param.name === 'sign'){
                return { ...param, value: name };
            }
            return param;
        })

        // Store the documents
        let result = await storeDocs(message);

        if (result instanceof Error) {
            return result;
        }

        let status = '';
        let updatedCuk: CUK | Error;

        if (message.statusCode && message.statusCode !== undefined && message.id !== undefined && message.setStatus) {

            status = message.statusCode;

            message.setStatus(status);
        }

        // Update the status of the message
        switch (status) {
            case MessageStatus.ENVIADO:
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

        if (messageResponse.messageCode === MessageTypes.ALZAMIENTO_HIPOTECARIO && status === MessageStatus.ENVIADO) {
            let cuk = new CUK();
            cuk.cukCode = messageResponse.cukCode;
            cuk.status = ForeclosureStatus.INIT
            
            updatedCuk = await updateForclosure(cukRepository, repository, cuk, message);
            
            if (updatedCuk instanceof Error) {
                console.error('Error updating CUK:', updatedCuk);
                return updatedCuk;
            }
        }

        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return error;
    }
}