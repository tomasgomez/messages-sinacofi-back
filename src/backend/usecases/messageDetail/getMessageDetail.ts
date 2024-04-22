import {
    MessageRepository
} from '../../repository/messageRepository';
import {
    Message
} from '../../entities/message/message';


// Get messageDetail function
export async function getMessageDetail(repository: MessageRepository, message: Message, count: string, offset: string): Promise < Message[] | Error > {
    try {
        var messageResponse = await repository.find(message, true, count, offset);
        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error fetching messageDetail:', error);
        return error;
    }
}