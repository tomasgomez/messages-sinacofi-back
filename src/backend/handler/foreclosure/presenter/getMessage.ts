import { Filter } from '@/backend/entities/global/filter';
import { processDateField, processStringArrayField } from '@/backend/utils/functions';

export function validateGetMessageForeclosure(data: any): Filter | Error {
  const filter: Filter = {};

  const {
    cukCode,
    id,
    name,
    description,
    startDate,
    endDate,
    channel,
    status,
    clientDni,
    clientName,
    institutionDestination,
    institutionCode,
    rutSeller,
    region,
    debtorRut,
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
  processStringArrayField('clientDni', clientDni, filter);
  processStringArrayField('clientName', clientName, filter);
  processStringArrayField('institutionCode', institutionCode, filter);
  processStringArrayField('institutionDestination', institutionDestination, filter);
  processStringArrayField('rutSeller', rutSeller, filter);
  processStringArrayField('region', region, filter);
  processStringArrayField('debtorRut', debtorRut, filter);
  processStringArrayField('count', count, filter);
  processStringArrayField('offset', offset, filter);

  if (startDate && endDate && startDate > endDate) {
    return new Error('Invalid date range');
  }

  return filter;
}
