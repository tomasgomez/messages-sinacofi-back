import { CUK } from '@/backend/entities/cuk/cuk';
import { Parameter } from '@/backend/entities/message/parameter';

type cukAccepted = {
  institutionCode: string; // atributo message
  institutionDestination: string;// atributo message
  channel: string, // parameter de nom bre name
  cukCode: string, // atributo en el cut
  notary: string, // missing param
  repertoireNumber: string, // N° de repertorio 
  registrationNumber: string,  // N° de repertorio
  registrationDate: string, // Fecha de repertorio
  buyerDni: string, // rut comprador
  borrowerDni: string, // rut del deudor
  issuedDate: string,// fecha de 
  NSE: number, // message por ahora 670 ¿De que mensaje?
  recievedDate: string, // atributo de messages por ahora 670  ¿De que mensaje?
  recievedTime: string, // atributo de messages por ahora 670  ¿De que mensaje?
  NSR: number, // message por ahora 670 ¿De que mensaje?
  rejectedCount: number, // count message 672
  creationDate: string, // del ultimo message 672
  creationTime: string, //  del ultimo message 672
  lastRejectedMessageNumber: string, // numerous de l ultimo rechazo (?)
  resendCreationDate: string, // fecha del reenvio del ultimo 670
  resendCreationTime: string, // hora del reenvío del ultimo 670
  resendMessageNumber: string, // N° de reeenvio, preguntar (?)
  acceptedCreationDate: string, // fecha del ultimo message 671 creado 
  acceptedCreationTime: string, // hora del ultimo message 671 creado
  acceptedMessageNumber: string, // N° de aceptacion, preguntar (?)
  signedReceivedDate: string, // fecha Escritura firmada, message 671, preguntar (?)
  signedReceivedTime: string, // Hora Escritura firmada, message 671,  preguntar (?)
  liquidationCreationDate: string, // Fecha 1ra Solic. Liquidación, creation date del primer message 674
  liquidationCreationTime: string, // Hora 1ra Solic. Liquidación, creation date del primer message 674
  liquiidationMessageNumber: string, // N° 1era Solic. Liquidación, mensaje 674, preguntar(?)
  confirmationCreationDate: string, // message 679 
  confirmationCreationTime: string, // message 679
  confirmationMessageNumber: string, // message 679
}


export function prepareForclosure(cuks: CUK[], filter: any = { detail: true }): any{
  const preparedCuk:cukAccepted[] = cuks.map((cuk) => {
    const last670 = cuk.messages?.filter((message) =>
       message.messageCode === '670'
      ).sort((a, b) => {
        return new Date(`${b.creationDate} ${b.creationTime}`).getTime() - new Date(`${a.creationDate} ${a.creationTime}`).getTime();
      })[0];

    const first670 = cuk.messages?.filter((message) =>
      message.messageCode === '670'
      ).sort((a, b) => {
        return new Date(`${a.creationDate} ${a.creationTime}`).getTime() - new Date(`${b.creationDate} ${b.creationTime}`).getTime() ;
      })[0];

    const last672 = cuk.messages?.filter((message) =>
       message.messageCode === '672'
      ).sort((a, b) => {
        return new Date(`${b.creationDate} ${b.creationTime}`).getTime() - new Date(`${a.creationDate} ${a.creationTime}`).getTime();
      })[0];

    const last671 = cuk.messages?.filter((message) =>
      message.messageCode === '671'
      ).sort((a, b) => {
        return new Date(`${a.creationDate} ${a.creationTime}`).getTime() - new Date(`${b.creationDate} ${b.creationTime}`).getTime() ;
      })[0];

    const last674 = cuk.messages?.filter((message) =>
      message.messageCode === '674'
      ).sort((a, b) => {
        return new Date(`${a.creationDate} ${a.creationTime}`).getTime() - new Date(`${b.creationDate} ${b.creationTime}`).getTime() ;
      })[0];

    const message679 = cuk.messages?.filter((message) =>
      message.messageCode === '679'
      )[0];
    
    const parameters = cuk.parameters || [];

    return {
      institutionCode: first670?.origin || '-',
      institutionDestination: first670?.destination || '-',
      channel:  filterParam(parameters, 'channel'),
      cukCode: cuk.cukCode || '-',
      notary: filterParam(parameters, 'notary'),
      repertoireNumber: filterParam(parameters, 'repertoireNumber'),
      registrationNumber: filterParam(parameters, 'registrationNumber'),
      registrationDate: filterParam(parameters, 'registrationNumber'),
      buyerDni: filterParam(parameters, 'buyerDni'),
      borrowerDni: filterParam(parameters, 'borrowerDni'),
      issuedDate: filterParam(parameters, 'issuedDate'),
      NSE: first670?.NSE?.id || 0,
      recievedDate: first670?.receivedDate || '-',
      recievedTime: first670?.receivedTime || '-',
      NSR: first670?.NSR?.id || 0,
      rejectedCount: cuk.messages?.filter((message) => message.messageCode === '672').length ||0,
      creationDate: last672?.creationDate || '-',
      creationTime: last672?.creationTime || '-',
      lastRejectedMessageNumber: '-', // (?¡)
      resendCreationDate: last670?.creationDate || '-',
      resendCreationTime: last670?.creationTime || '-',
      resendMessageNumber:  '-',// (?¡)
      acceptedCreationDate: last671?.creationDate || '-',
      acceptedCreationTime: last671?.creationTime || '-',
      acceptedMessageNumber:  '-',// (?¡)
      signedReceivedDate: last671?.receivedDate || '-',
      signedReceivedTime: last671?.receivedTime || '-',
      liquidationCreationDate: last674?.creationDate || '-',
      liquidationCreationTime:  last674?.creationTime || '-',
      liquiidationMessageNumber:  '-',// (?¡)
      confirmationCreationDate: message679?.creationDate || '-',
      confirmationCreationTime: message679?.creationTime || '-',
      confirmationMessageNumber:  '-',// (?¡)
    }
  })
  return preparedCuk;
}

const filterParam = (parameters: Parameter[], name: string) => {
  return parameters.find((parameter) => parameter.name === name)?.value || '';
}