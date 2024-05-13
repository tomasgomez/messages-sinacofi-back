import {
  Filter
} from '@/backend/entities/global/filter';
import {
  processDateField,
  processStringArrayField
} from '@/backend/utils/functions';

export function validateGetMessageForeclosure(data: any): Filter | Error {
  const filter: Filter = {};

  const {
    cukCode,
    messageCode,
    messageStatus,
    id,
    name,
    description,
    startDate,
    endDate,
    channel,
    status,
    institutionDestination,
    institutionCode,
    buyerDni,
    buyer,
    ownerDni,
    owner,
    borrowerDni,
    borrower,
    count,
    offset
  } = data;

  /* Set all the possible filters */
  processStringArrayField('cukCode', cukCode, filter);
  processStringArrayField('id', id, filter);
  processStringArrayField('name', name, filter);
  processStringArrayField('description', description, filter);
  processDateField('startDate', startDate, filter);
  processDateField('endDate', endDate, filter);
  processStringArrayField('channel', channel, filter);
  processStringArrayField('status', status, filter);
  processStringArrayField('institutionCode', institutionCode, filter);
  processStringArrayField('institutionDestination', institutionDestination, filter);
  processStringArrayField('buyerDni', buyerDni, filter);
  processStringArrayField('buyer', buyer, filter);
  processStringArrayField('ownerDni', ownerDni, filter);
  processStringArrayField('owner', owner, filter);
  processStringArrayField('borrowerDni', borrowerDni, filter);
  processStringArrayField('borrower', borrower, filter);
  processStringArrayField('messageCode', messageCode, filter);
  processStringArrayField('count', count, filter);
  processStringArrayField('offset', offset, filter);
  processStringArrayField('messageStatus', messageStatus, filter);


  if (startDate && endDate && startDate > endDate) {
    return new Error('Invalid date range');
  }

  return filter;
}