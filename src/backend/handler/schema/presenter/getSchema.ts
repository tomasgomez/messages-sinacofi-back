import {
  Filter
} from '@/backend/entities/schema/filter';
import { processStringArrayField } from '@/backend/utils/functions';


export function validateGetSchema(data: any): Filter | Error {
  const filter: Filter = {};
  const {
    messageCode,
    messageId,
    origin,
    destination,
    count,
    offset,
    cukCode,
    action
  } = data;

  /* Set all the possible filters */
  filter.messageId = processStringArrayField(messageId);
  filter.messageCode = processStringArrayField(messageCode);
  filter.origin = processStringArrayField(origin);
  filter.destination = processStringArrayField(destination);
  filter.cuk = cukCode
  filter.action = action ?? ''

  filter.count = count;
  filter.offset = offset;

  return filter;
}