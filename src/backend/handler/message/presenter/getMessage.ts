import { FilterMessage } from '@/backend/entities/message/filter';
import { processStringArrayField, processDateField } from '@/backend/utils/functions';

export function validateGetMessage(data: any): FilterMessage | Error {
  let filter: FilterMessage = {
    detail: false,
  }

  const {
    id,
    messageCode,
    status,
    date,
    cukCode,
    origin,
    destination,
    count,
    offset
  } = data;

  /* Set all the possible filters */
  filter.id = processStringArrayField(id);
  filter.messageCode = processStringArrayField(messageCode);
  filter.status = processStringArrayField(status);
  filter.cukCode = processStringArrayField(cukCode);
  filter.origin = processStringArrayField(origin);
  filter.destination = processStringArrayField(destination);
  filter.createdAt = processDateField(date) ?? new Date;
  
  filter.count = count;
  filter.offset = offset;

  filter.detail = false;

  return filter;
}