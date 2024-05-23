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

    

    return messageData;
}

export { createData };