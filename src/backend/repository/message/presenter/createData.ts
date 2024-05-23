import { Message } from "@/backend/entities/message/message";

function createData (message: Message): Partial<Message> {
    // Prepare message data for Prisma create
    const messageData: Partial < Message > = {};
    for (const [key, value] of Object.entries(message)) {
        if (key === 'parameters' || key === 'documents') {
            continue;
        }
        if (key === 'cukCode') {
            messageData['cukCode'] = message.cukCode != '' ? message.cukCode : undefined;
            continue;    
        }
        if (value !== undefined) {
            messageData[key as keyof Message] = value;
        }
    }

    if (message.parameters && message.cukCode && message.cukCode !== '') {
        messageData.parameters = message.parameters?.map((parameter) => {
            parameter.cukCode = message.cukCode;

            console.log('Parameter:', parameter);
            return parameter;
        });
    }

    delete messageData.statusCode;

    return messageData;
}

export { createData };