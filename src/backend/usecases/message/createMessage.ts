import {
    Message
} from "@/backend/entities/message/message";
import {
    MessageRepository
} from "@/backend/repository/messageRepository";
import {
    getChileanTime
} from "@/backend/utils/functions";
import {
    getSchemaTypes
} from '@/backend/handler/rule/get';
import { InternalError } from "@/backend/entities/internalError";
import { MessageStatus } from "@/backend/entities/message/status";
import {MessageTypes} from "@/backend/entities/message/types";
import { CUK } from "@/backend/entities/cuk/cuk";


// Create message function
export async function createMessage(repository: MessageRepository, message: Message): Promise < Message | Error > {
    try {

        if (message.messageCode === MessageTypes.ALZAMIENTO_HIPOTECARIO) {
            let cuk = new CUK();

            if (cuk.setCukCode){
                cuk.setCukCode();
            }

            message.cukCode = cuk.cukCode;
        }

        /* Get the schema types */
        let schemtaTypes = await getSchemaTypes();

        if (schemtaTypes instanceof InternalError) {
            return schemtaTypes;
        }

        /* Loop through the schema types and get the description */
        for (let schemaType of schemtaTypes) {
            if (message.messageCode === schemaType.messageCode) {
                message.description = schemaType.description;
                break;
            }
        }

        /* Get the Chilean time */
        let response = getChileanTime();

        if (response instanceof Error) {
            return response;
        }

        let [dateString, time] = response;

        /* Set the received date and time */
        if (message.status === MessageStatus.BANDEJA_DE_ENTRADA) { 
            message.receivedDate = dateString;
            message.receivedTime = time;
        }

        let messageResponse = await repository.create(message);

        /* Check if the response is an error */
        if (messageResponse instanceof Error) {
            return messageResponse;
        }

        /* Check if the id is undefined */
        if (messageResponse.id === undefined) {
            return new Error('No id returned');
        }

        return messageResponse;
    } catch (error: any) {
        console.error('Error creating message:', error);
        return error;
    }
}