import { FilterMessage } from '@/backend/entities/message/filter';
import { processStringArrayField, processDateField } from '@/backend/utils/functions';

export function validateGetMessage(request: any): FilterMessage | Error {
  let data = request.query;
  
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
  filter.createdAt = processDateField(date);
  filter.status = processStringArrayField(status);
  
  filter.count = count;
  filter.offset = offset;

  filter.detail = false;

  return filter;
}