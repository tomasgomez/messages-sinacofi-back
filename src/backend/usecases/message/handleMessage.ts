import {
    Message
} from "@/backend/entities/message/message";
import {
    MessageRepository
} from "@/backend/repository/messageRepository";
import {
    messageForeclosureUseCase
} from "../foreclosure/usecases";
import {
    isForeclosureMessageCode
} from "@/backend/entities/cuk/codes";
import {
    createMessage
} from "./createMessage";
import {
    CUK
} from "@/backend/entities/cuk/cuk";
import {
    Parameter
} from "@/backend/entities/message/interface";
import {
    getSchema
} from "@/backend/usecases/schema/getSchema";


// Create message function
export async function handleMessage(repository: MessageRepository, message: Message, ): Promise < Message | Error > {
    try {

        /* CUK flow */
        if (message.messageCode && isForeclosureMessageCode(message?.messageCode)) {

            message = await completeParameters(message);

            let newMessage = await messageForeclosureUseCase.handleForeclosure(new CUK, message);

            if (newMessage instanceof Error)
                return newMessage;

            // Check if newMessage is type of the interface ICUK
            if (newMessage instanceof CUK) {
                return Error('Error creating message');
            }

            return newMessage;
        }

        /* Normal flow */
        return await createMessage(repository, message);

    } catch (error: any) {
        console.error('Error creating message:', error);
        return error;
    }
}

/* Function to complete parameters */
async function completeParameters(message: Message): Promise < Message > {
    if (!message.parameters || message.parameters.length == 0 || !message.messageCode) {
        return message
    }

    /* Get schema */
    let schemas = await getSchema(message.messageCode);

    if (schemas instanceof Error || !schemas || schemas.length === 0) {
        return message;
    }

    let schema = schemas[0];

    if (!schema || !schema.parameters || schema.parameters === undefined || schema.parameters.length === 0) {
        return message;
    }

    /* Traverse through the message parameters and match them with the schema */
    message.parameters = message.parameters.map((param: any) => {

        /* Cut it if it's not a parameter */
        if (!schema.parameters) {
            return param;
        }

        return schema.parameters.map((paramSchema: any) => {
            
            if (paramSchema.name === param.name) {
                let parameter: Parameter = {
                    id: paramSchema.id,
                    name: paramSchema.name,
                    messageCode : paramSchema.messageCode,
                    label : paramSchema.label,
                    type : paramSchema.type,
                    defaultValue : paramSchema.defaultValue,
                    priority : paramSchema.priority,
                    description : paramSchema.description,
                    placeholder : paramSchema.placeholder,
                }


                if (paramSchema && paramSchema.name == 'CUK') {
                    parameter.defaultValue = message.cukCode;
                }

                return parameter;
            }
        });
    });


    return message;

}