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
} from "@/backend/usecases/schema/getSchemaTypes";
import {
    InternalError
} from "@/backend/entities/internalError";
import {
    MessageStatus
} from "@/backend/entities/message/status";
import {
    MessageTypes
} from "@/backend/entities/message/types";
import {
    CUK
} from "@/backend/entities/cuk/cuk";
import {
    messageForeclosureUseCase
} from "../messageForeclosure/usecases";


// Create message function
export async function createMessage(repository: MessageRepository, message: Message, ): Promise < Message | Error > {
    try {

        /* Check if is a foreclosure message, then create the foreclosure */
        if (message.messageCode === MessageTypes.ALZAMIENTO_HIPOTECARIO) {

            let cuk = await messageForeclosureUseCase.createForeclosure(new CUK, message);

            if (cuk instanceof Error) {
                return cuk;
            }

            if (cuk.cukCode === undefined) {
                return new Error('No cuk code returned');
            }

            message.cukCode = cuk.cukCode;
        }

        /* Get the schema types */
        // let schemaTypes = await getSchema();

        if (schemaTypes instanceof InternalError) {
            return schemaTypes;
        }

        /* Loop through the schema types and get the description */
        for (let schemaType of schemaTypes) {
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
const schemaTypes = [{
        "id": "1",
        "messageCode": "199",
        "description": "TEXTO LIBRE"
    },
    {
        "id": "2",
        "messageCode": "136",
        "description": "TRANSFERENCIA DE FONDOS INDIVIDUAL"
    },
    {
        "id": "3",
        "messageCode": "670",
        "description": "ALZAMIENTO HIPOTECARIO"
    }
]