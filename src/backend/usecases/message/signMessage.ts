import {
    CUK
} from "@/backend/entities/cuk/cuk";
import {
    Message,
    setStatus
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
import { User } from "@/backend/entities/user/user";
import { validateMessage } from "./validateMessage";
import { handleAction672 } from "../foreclosure/foreclosureMessages/handle672";

// Create message function
export async function signMessage(repository: MessageRepository, cukRepository: CUKRepository, message: Message, dni: string, name: string, user: User): Promise < Message | Error > {
    try {        
        
        message.parameters = message.parameters?.map(param=> {
            if(param.name === 'sign'){
                return { ...param, value: name };
            }
            return param;
        })
        
        let validateMessageResponse = await validateMessage(repository, message, user);

        if (validateMessageResponse instanceof Error) {
            return validateMessageResponse;
        }

        message = {...message, ...validateMessageResponse};

        // Store the documents
        if(process.env.NEXT_PUBLIC_TEST_ENV !== "true"){
            let result = await storeDocs(message);

            if (result instanceof Error) {
                return result;
            }
        }

        let status = ''
        let updatedCuk: CUK | Error;

        if (message.statusCode && message.statusCode !== undefined && message.id !== undefined) {

            status = message.statusCode;
            
            message = setStatus(message, status);
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

        /* Update the message */
        let messageResponse = await repository.update(message);

        if (messageResponse instanceof Error) {
            return messageResponse;
        }

        
        if (messageResponse.messageCode === MessageTypes.ALZAMIENTO_HIPOTECARIO) {

            let cuk = new CUK();
            cuk.cukCode = messageResponse.cukCode;
            cuk.status = ForeclosureStatus.INIT
            
            updatedCuk = await updateForclosure(cukRepository, repository, cuk, message, user);
            
            if (updatedCuk instanceof Error) {
                console.error('Error updating CUK:', updatedCuk);
                return updatedCuk;
            }
        } else if(messageResponse.messageCode === MessageTypes.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO){
            await handleAction672(new CUK, messageResponse, user, cukRepository, repository);
        }

        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error fetching message:', error);
        return error;
    }
}