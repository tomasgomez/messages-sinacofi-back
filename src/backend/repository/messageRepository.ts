import {
  FilterMessage
} from '@/backend/entities/message/filter';
import {
  Message
} from '../entities/message/message';


export interface MessageRepository {
    find(message: Message, detail: boolean, count: string, offset: string): Promise < Message[] | Error >
    create(message: Message): Promise < Message | Error >
    update(message: Message): Promise < Message | Error >
    duplicateMessage(message: Message): Promise < Message | Error >
    findBy(filter: FilterMessage): Promise < Message[] | Error >
}
