import {
  Filter
} from '@/backend/entities/schema/filter';

export function validateGetSchema(data: any): Filter | Error {
  const filter: Filter = {};

  const {
    messageCode,
    count,
    offset,
  } = data;

  if (messageCode && typeof messageCode === 'string' && messageCode.trim() !== '') {
    filter.messageCode = messageCode.trim().split(',').map(code => code.trim());
  }

  if (count && typeof count === 'string' && count.trim() !== '') {
    filter.count = count.trim();
  }

  if (offset && typeof offset === 'string' && offset.trim() !== '') {
    filter.offset = offset.trim();
  }

  return filter;
}