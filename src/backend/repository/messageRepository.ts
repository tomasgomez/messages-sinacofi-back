import {
  FilterMessage
} from '@/backend/entities/message/filter';
import {
  Message
} from '../entities/message/message';

export interface MessageRepository {
    find(message: FilterMessage): Promise < Message[] | Error >
    create(message: Message): Promise < Message | Error >
    update(message: Message): Promise < Message | Error >
    delete(message: Message): Promise < Message | Error >
    findBy(filter: FilterMessage): Promise < Message[] | Error >
}
