import { CUK } from '@/backend/entities/cuk/cuk';
import { Parameter } from '@/backend/entities/message/parameter';

type cukRejected  = {
  //Tengo que filtrar todos los CUKS donde mi ultimo mensaje es un 672
  //Y los atributos del 670 tiene que ser también el ultimo creado….
  institutionCode: string; // atributo message, 670
  institutionDestination: string; // atributo message, 670
  messageCode: string; // 670
  creationDate: string; //
  creationTime: string; //
  NSE: number; //
  recievedDate: string; //
  recievedTime: string; //
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
  sellerDNI: string;  //parameter
  buyerDni: string;  //parameter
  borrowerDni: string; //parameter
  cukCode: string; 
  rejectionReason: string;  //parameter
  observations: string; //parameter
}

function prepareForclosure(cuks: CUK[], filter: any = { detail: true }): any{
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
      creationDate: last670?.creationDate || '',
      creationTime: last670?.creationTime || '',
      NSE:last670?.NSE?.id || 0,
      recievedDate:last670?.receivedDate || '',
      recievedTime:last670?.receivedTime || '',
      NSR:last670?.NSR?.id || 0,
      channel: filterParam(parameters || '', 'channel') || '',
      notary: filterParam(parameters || '', 'notary') || '',
      repertoireNumber: filterParam(parameters || '', 'repertoireNumber') || '',
      repertorieDate: filterParam(parameters || '', 'repertoireDate') || '',
    
      rejectedMessageCode: last672?.messageCode || '', 
      rejectedCreationDate: last672?.creationDate || '',
      rejectedNSE: last672?.NSR?.id || 0, 
      rejectedRecievedDate: last672?.receivedDate || '',
      rejectedNSR: last672?.NSR?.id || 0, 
      sellerDNI: filterParam(parameters || '', 'sellerDNI') || '',
      buyerDni: filterParam(parameters || '', 'buyerDni') || '',
      borrowerDni: filterParam(parameters || '', 'borrowerDni') || '',
      cukCode: last672?.cukCode || '', 
      rejectionReason: filterParam(parameters || '', 'rejectionReason') || '',
      observations: filterParam(parameters || '', 'observations') || '',
    }
  })
  return preparedCuk;
}

const filterParam = (parameters: Parameter[], name: string) => {
  return parameters.find((parameter) => parameter.name === name)?.value || '';
}

export { prepareForclosure }