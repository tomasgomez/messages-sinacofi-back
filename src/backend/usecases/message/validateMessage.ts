
import { Message } from "@/backend/entities/message/message";
import { MessageRepository } from "@/backend/repository/messageRepository";
import { post } from "@/backend/adapters/rule/post";
import { getEnvVariable } from '@/backend/utils/functions';
import { envVariables } from '@/backend/utils/variables';
import { User } from "@/backend/entities/user/user";

export async function validateMessage(repository: MessageRepository, message: Message, user: User): Promise <Message | Error>  {
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
        ...message,
    })

    message.parameters = message.parameters?.map((parameter) => {
        let param = messageValidated.parameters.find((param: any) => param?.name === parameter?.name);

        if (!param) {
            return parameter;
        }

        return {
            ...parameter,
            ...param,
            label: param.label,
        }
    });

    if (messageValidated instanceof Error) {
        return new Error('Message schema not found');
    }

    return {...message, ...messageValidated, parameters: message.parameters}
}