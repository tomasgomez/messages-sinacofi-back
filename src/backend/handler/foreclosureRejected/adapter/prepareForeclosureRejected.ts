import { CUK } from '@/backend/entities/cuk/cuk';
import { getDateFromDateString, getTimeFromDateString } from '@/utils/dateFormatting';
import { filterParam } from '@/utils/filterParameters';

type cukRejected  = {
  //Tengo que filtrar todos los CUKS donde mi ultimo mensaje es un 672
  //Y los atributos del 670 tiene que ser también el ultimo creado….
  institutionCode: string; // atributo message, 670
  institutionDestination: string; // atributo message, 670
  messageCode: string; // 670
  creationDate: string; // 
  creationTime: string; //
  NSE: number; //
  recievedDate: string; // NSR.createdAt
  recievedTime: string; // NSR.createdAt
  NSR: number; //
  channel: string; //
  notary: string; //
  repertoireNumber: string; // N° de repertorio 
  repertorieDate: string; // atributo de messages por ahora 670  ¿De que mensaje?
  rejectedMessageCode: string; //  ultimo 672
  rejectedCreationDate: string;  //  ultimo 672creationTime //  ultimo 672
  rejectedNSE: number; //  ultimo 672
  rejectedRecievedDate: string;//  ultimo 672recievedTime //  ultimo 672
  rejectedNSR: number; //  ultimo 672
  sellerDni: string;  //parameter
  buyerDni: string;  //parameter
  borrowerDni: string; //parameter
  cukCode: string; 
  rejectionReason: string;  //parameter
  observations: string; //parameter
}

function prepareForclosure(cuks: CUK[]): any{
  const preparedCuk:cukRejected[] = cuks.map((cuk) => {    
    const last670 = cuk.messages?.filter((message) =>
       message.messageCode === '670'
      ).sort((a, b) => {
        return new Date(`${b.creationDate} ${b.creationTime}`).getTime() - new Date(`${a.creationDate} ${a.creationTime}`).getTime();
      })[0];

    const last672 = cuk.messages?.filter((message) =>
       message.messageCode === '672'
      ).sort((a, b) => {
        return new Date(`${b.creationDate} ${b.creationTime}`).getTime() - new Date(`${a.creationDate} ${a.creationTime}`).getTime();
      })[0];
        
    const parameters = cuk.parameters || [];

    return {
      institutionCode: last670?.origin || '', 
      institutionDestination: last670?.destination || '',
      messageCode: last670?.messageCode || '', 
      creationDate: getDateFromDateString(last670?.NSE?.createdAt as Date) || '',
      creationTime: getTimeFromDateString(last670?.NSE?.createdAt as Date) || '',
      NSE:last670?.NSE?.id || 0,
      recievedDate: getDateFromDateString(last670?.NSR?.createdAt as Date) || '',
      recievedTime: getTimeFromDateString(last670?.NSR?.createdAt as Date) || '',
      NSR:last670?.NSR?.id || 0,
      channel: filterParam(parameters || '', 'channel')?.value || '',
      notary: filterParam(parameters || '', 'notary')?.value || '',
      repertoireNumber: filterParam(parameters || '', 'repertoireNumber')?.value || '',
      repertorieDate: filterParam(parameters || '', 'repertoireDate')?.value || '',
    
      rejectedMessageCode: last672?.messageCode || '', 
      rejectedCreationDate: getDateFromDateString(last672?.NSE?.createdAt as Date) || '',
      rejectedNSE: last672?.NSR?.id || 0, 
      rejectedRecievedDate: getDateFromDateString(last672?.NSR?.createdAt as Date) || '',
      rejectedNSR: last672?.NSR?.id || 0, 
      sellerDni: filterParam(parameters || '', 'sellerDni')?.value || '',
      buyerDni: filterParam(parameters || '', 'buyerDni')?.value || '',
      borrowerDni: filterParam(parameters || '', 'borrowerDni')?.value || '',
      cukCode: last672?.cukCode || '', 
      rejectionReason: filterParam(parameters || '', 'rejectionReason')?.value || '',
      observations: filterParam(parameters || '', 'observations')?.value || '', // TODO: check parameter name
    }
  })
  return preparedCuk;
}

export { prepareForclosure }