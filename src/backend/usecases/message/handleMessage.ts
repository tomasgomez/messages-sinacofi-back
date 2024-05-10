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


// Create message function
export async function handleMessage(repository: MessageRepository, message: Message, ): Promise < Message | Error > {
    try {

        /* CUK flow */
        if (message.messageCode && isForeclosureMessageCode(message?.messageCode)) {

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