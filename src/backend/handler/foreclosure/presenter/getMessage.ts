import { getForeclosureStatusCodesByStatus } from '@/backend/entities/cuk/codes';
import {
  Filter
} from '@/backend/entities/cuk/filter';
import {
  processDateField,
  processStringArrayField
} from '@/backend/utils/functions';

export function validateGetMessageForeclosure(data: any): Filter | Error {
  let filter: Filter = {};

  const {
    cukCode,
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
    offset,
    region,
    messageCode,
    statusCategory,
    sellerDni,
    seller,
    notary,
    repertoireDate
  } = data;

  /* Set all the possible filters */
  filter.cukCode = processStringArrayField(cukCode);
  filter.id = processStringArrayField(id);
  filter.name = processStringArrayField(name);
  filter.description = processStringArrayField(description);
  filter.startDate = processDateField(startDate) ?? new Date;
  filter.endDate = processDateField(endDate) ?? new Date;
  filter.channel = processStringArrayField(channel);
  filter.status = processStringArrayField(status);
  filter.institutionCode = processStringArrayField(institutionCode);
  filter.institutionDestination = processStringArrayField(institutionDestination);
  filter.buyerDni = processStringArrayField(buyerDni);
  filter.buyer = processStringArrayField(buyer);
  filter.ownerDni = processStringArrayField(ownerDni);
  filter.owner = processStringArrayField(owner);
  filter.borrowerDni = processStringArrayField(borrowerDni);
  filter.borrower = processStringArrayField(borrower);
  filter.messageStatus = processStringArrayField(messageStatus);
  filter.region = processStringArrayField(region);
  filter.messageCode = processStringArrayField(messageCode);
  filter.statusCategory = getForeclosureStatusCodesByStatus(statusCategory);
  filter.sellerDni = processStringArrayField(sellerDni);
  filter.seller = processStringArrayField(seller);
  filter.notary = processStringArrayField(notary);
  filter.repertoireDate = processStringArrayField(repertoireDate);
  
  filter.count = count;
  filter.offset = offset;
  
  if (startDate && endDate && startDate > endDate) {
    return new Error('Invalid date range');
  }

  return filter;
}