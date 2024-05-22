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
} from "@/backend/entities/message/parameter";
import {
    getSchema
} from "@/backend/usecases/schema/getSchema";


// Create message function
export async function handleMessage(repository: MessageRepository, message: Message, ): Promise < Message | Error > {
    try {

        /* CUK flow */
        if (message.messageCode && isForeclosureMessageCode(message?.messageCode)) {

            // message = await completeParameters(message);

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

async function completeParameters(message: Message): Promise<Message> {
    if (!message.parameters || message.parameters.length === 0 || !message.messageCode) {
        return message;
    }

    // Get schema
    let schemas = await getSchema(message.messageCode);

    if (schemas instanceof Error) {
        return message;
    }

    if (!schemas || schemas.length === 0 || schemas instanceof Error) {
        return message;
    }

    let schema = schemas[0];

    if (!schema || !schema.parameters || schema.parameters.length === 0) {
        return message;
    }

    // Traverse through the message parameters and match them with the schema
    message.parameters.forEach((param: Parameter) => {
        if (!schema.parameters)
            return;

        const matchedParam = schema.parameters.find((paramSchema: Parameter) => paramSchema.name === param.name);

        if (matchedParam) {
            // Update parameter with schema data
            param.id = matchedParam.id;
            param.messageCode = matchedParam.messageCode;
            param.label = matchedParam.label;
            param.type = matchedParam.type;
            param.defaultValue = matchedParam.defaultValue;
            param.priority = matchedParam.priority;
            param.description = matchedParam.description;
            param.placeholder = matchedParam.placeholder;

            // Set default value if the parameter is 'CUK'
            if (param.name === 'CUK') {
                param.defaultValue = message.cukCode;
            }
        }
    });

    return message;
}