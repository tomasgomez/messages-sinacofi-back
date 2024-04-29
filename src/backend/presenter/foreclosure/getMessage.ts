import {
  Filter
} from '@/backend/entities/cuk/filter';

export function validateGetMessageForeclosure(data: any): Filter | Error {
  const filter: Filter = {};

  const {
    id,
    name,
    cukCode,
    description,
    startDate,
    endDate,
    channel,
    status,
    clientDni,
    clientName,
    institutionDestination,
    count,
    offset,
    rutSeller,
    region,
    debtorRut
  } = data;

  if (cukCode && typeof cukCode === 'string' && cukCode.trim() !== '') {
    // Split the string by commas and trim each code
    filter.cukCode = cukCode.trim().split(',').map(code => code.trim());
  }

  if (id && typeof id === 'string' && id.trim() !== '') {
    // Split the string by commas and trim each id
    filter.id = id.trim().split(',').map(id => id.trim());
  }

  if (name && typeof name === 'string' && name.trim() !== '') {
    // Split the string by commas and trim each name
    filter.name = name.trim().split(',').map(name => name.trim());
  }

  if (description && typeof description === 'string' && description.trim() !== '') {
    // Split the string by commas and trim each description
    filter.description = description.trim().split(',').map(description => description.trim());
  }

  if (startDate && typeof startDate === 'string' && startDate.trim() !== '') {
    // Split the string by commas and trim each startDate
    let convertedToDate = new Date(startDate.trim());

    if (convertedToDate.toString() !== 'Invalid Date' || convertedToDate.toString() === 'NaN') {
      filter.startDate = convertedToDate;
    }
  }

  if (endDate && typeof endDate === 'string' && endDate.trim() !== '') {
    // Split the string by commas and trim each endDate
    let convertedToDate = new Date(endDate.trim());

    if (convertedToDate.toString() !== 'Invalid Date' || convertedToDate.toString() === 'NaN') {
      filter.endDate = convertedToDate;
    }
  }

  if (channel && typeof channel === 'string' && channel.trim() !== '') {
    // Split the string by commas and trim each channel
    filter.channel = channel.trim().split(',').map(channel => channel.trim());
  }

  if (status && typeof status === 'string' && status.trim() !== '') {
    // Split the string by commas and trim each status
    filter.status = status.trim().split(',').map(status => status.trim());
  }

  if (clientDni && typeof clientDni === 'string' && clientDni.trim() !== '') {
    // Split the string by commas and trim each clientDni
    filter.clientDni = clientDni.trim().split(',').map(clientDni => clientDni.trim());
  }

  if (clientName && typeof clientName === 'string' && clientName.trim() !== '') {
    // Split the string by commas and trim each clientName
    filter.clientName = clientName.trim().split(',').map(clientName => clientName.trim());
  }

  if (institutionDestination && typeof institutionDestination === 'string' && institutionDestination.trim() !== '') {
    // Split the string by commas and trim each institutionDestination
    filter.institutionDestination = institutionDestination.trim().split(',').map(institutionDestination => institutionDestination.trim());
  }

  if (rutSeller && typeof rutSeller === 'string' && rutSeller.trim() !== '') {
    // Split the string by commas and trim each rutSeller
    filter.rutSeller = rutSeller.trim().split(',').map(rutSeller => rutSeller.trim());
  }

  if (region && typeof region === 'string' && region.trim() !== '') {
    // Split the string by commas and trim each region
    filter.region = region.trim().split(',').map(region => region.trim());
  }

  if (debtorRut && typeof debtorRut === 'string' && debtorRut.trim() !== '') {
    // Split the string by commas and trim each debtorRut
    filter.debtorRut = debtorRut.trim().split(',').map(debtorRut => debtorRut.trim());
  }

  if (count && typeof count === 'string' && count.trim() !== '') {
    filter.count = count.trim();
  }

  if (offset && typeof offset === 'string' && offset.trim() !== '') {
    filter.offset = offset.trim();
  }

  if (startDate && endDate && startDate > endDate) {
    return new Error('Invalid date range');
  }

  return filter;
}