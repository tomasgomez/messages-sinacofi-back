import {
    Message
} from "@/backend/entities/message/message";
import {
    MessageRepository
} from "@/backend/repository/messageRepository";
import { post } from "@/backend/adapters/rule/post";
import { getEnvVariable } from '@/backend/utils/functions';
import { envVariables } from '@/backend/utils/variables';
import { User } from "@/backend/entities/user/user";


// Create message function
export async function createMessage(repository: MessageRepository, message: Message, user: User): Promise < Message | Error > {
    try {

        if (!message.messageCode) {
            return new Error('Message code is required');
        }

        let ruleUrl = getEnvVariable(envVariables.RULE_CLIENT_URL);

        if (ruleUrl instanceof Error) {
            return ruleUrl;
        }

        let validateMessagePath = getEnvVariable(envVariables.VALIDATE_MESSAGE);

        if (validateMessagePath instanceof Error) {
            return validateMessagePath;
        }

        let messageValidated = await post(ruleUrl, validateMessagePath, {}, {
            user: user,
            message,
        })

        if (messageValidated instanceof Error) {
            return new Error('Message schema not found');
        }

        let messageResponse = await repository.create(messageValidated);

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