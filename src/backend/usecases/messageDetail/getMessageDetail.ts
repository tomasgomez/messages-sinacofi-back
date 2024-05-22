import {
    MessageRepository
} from '../../repository/messageRepository';
import {
    Message
} from '../../entities/message/message';
import { FilterMessage } from '@/backend/entities/message/filter';


// Get messageDetail function
export async function getMessageDetail(repository: MessageRepository, message: FilterMessage): Promise < Message[] | Error > {
    try {
        let messageResponse = await repository.find(message);
        return messageResponse;
    } catch (error: any) {
        // Handle errors appropriately
        console.error('Error fetching messageDetail:', error);
        return error;
    }
}