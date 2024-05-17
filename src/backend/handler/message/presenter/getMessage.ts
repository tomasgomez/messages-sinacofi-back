import { FilterMessage } from '@/backend/entities/message/filter';

export function validateGetMessage(data: any): FilterMessage | Error {
  let filter: FilterMessage = {
    detail: false,
  }

  return filter;
}