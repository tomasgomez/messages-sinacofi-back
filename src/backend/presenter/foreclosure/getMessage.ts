import { MessageFilter } from '@/backend/entities/message/filter';

export function validateGetMessageForeclosure(data: any): [MessageFilter] | Error {
  const filter: MessageFilter = {};

  const { CUK, startDate, endDate, receiver, clientDni, sellerDni, payerDni, region, count, offset } = data;

  let countResponse: string = '0';
  let offsetResponse: string = '0';

  if (CUK && typeof CUK === 'string' && CUK.trim() !== '') {
    filter.CUK = CUK.trim();
  }

  if (startDate && typeof startDate === 'string' && startDate.trim() !== '') {
    filter.startDate = startDate.trim();
  }

  if (endDate && typeof endDate === 'string' && endDate.trim() !== '') {
    filter.endDate = endDate.trim();
  }

  if (receiver && typeof receiver === 'string' && receiver.trim() !== '') {
    filter.receiver = receiver.trim();
  }

  if (clientDni && typeof clientDni === 'string' && clientDni.trim() !== '') {
    filter.clientDni = clientDni.trim();
  }

  if (sellerDni && typeof sellerDni === 'string' && sellerDni.trim() !== '') {
    filter.sellerDni = sellerDni.trim();
  }

  if (payerDni && typeof payerDni === 'string' && payerDni.trim() !== '') {
    filter.payerDni = payerDni.trim();
  }

  if (region && typeof region === 'string' && region.trim() !== '') {
    filter.region = region.trim();
  }

  if (count && typeof count === 'string' && count.trim() !== '') {
    filter.count = count.trim();
  }

  if (offset && typeof offset === 'string' && offset.trim() !== '') {
    filter.offset = offset.trim();
  }

  return [filter];
}
