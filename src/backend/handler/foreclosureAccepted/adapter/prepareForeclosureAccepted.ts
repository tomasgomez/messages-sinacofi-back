import { CUK } from '@/backend/entities/cuk/cuk';
import { getDateFromDateString, getTimeFromDateString } from '@/utils/dateFormatting';
import { filterParam } from '@/utils/filterParameters';

type cukAccepted = {
  institutionCode: string; // atributo message
  institutionDestination: string;// atributo message
  channel: string, // parameter de nom bre name
  cukCode: string, // atributo en el cut
  notary: string, // missing param
  repertoireNumber: string, // N° de repertorio 
  repertoireDate: string, // N° de repertorio 
  buyerDni: string, // rut comprador
  borrowerDni: string, // rut del deudor
  creationDate: string, // NSR.createdAt
  creationTime: string, // NSR.createdAt
  NSE: number, // message por ahora 670 ¿De que mensaje?
  recievedDate: string, // atributo de messages por ahora 670  ¿De que mensaje?
  recievedTime: string, // atributo de messages por ahora 670  ¿De que mensaje?
  NSR: number, // message por ahora 670 ¿De que mensaje?
  rejectedCount: number, // count message 672
  rejectedCreationDate: string, // del ultimo message 672
  rejectedCreationTime: string, //  del ultimo message 672
  lastRejectedMessageNumber: number, // numerous de l ultimo rechazo (?)
  resendCreationDate: string, // fecha del reenvio del ultimo 670
  resendCreationTime: string, // hora del reenvío del ultimo 670
  resendMessageNumber: number, // N° de reeenvio, preguntar (?)
  acceptedCreationDate: string, // fecha del ultimo message 671 creado 
  acceptedCreationTime: string, // hora del ultimo message 671 creado
  acceptedMessageNumber: number, // N° de aceptacion, preguntar (?)
  signedReceivedDate: string, // fecha Escritura firmada, message 671, preguntar (?)
  signedReceivedTime: string, // Hora Escritura firmada, message 671,  preguntar (?)
  liquidationCreationDate: string, // Fecha 1ra Solic. Liquidación, creation date del primer message 674
  liquidationCreationTime: string, // Hora 1ra Solic. Liquidación, creation date del primer message 674
  liquidationMessageNumber: number, // N° 1era Solic. Liquidación, mensaje 674, preguntar(?)
  confirmationCreationDate: string, // message 679 
  confirmationCreationTime: string, // message 679
  confirmationMessageNumber: number, // message 679
}

export function prepareForclosure( cuks: CUK[] ): any{
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

    const last671 = cuk.messages?.filter((message) =>
      message.messageCode === '671'
      ).sort((a, b) => {
        return new Date(`${a.creationDate} ${a.creationTime}`).getTime() - new Date(`${b.creationDate} ${b.creationTime}`).getTime() ;
      })[0];

    const last672 = cuk.messages?.filter((message) =>
       message.messageCode === '672'
      ).sort((a, b) => {
        return new Date(`${b.creationDate} ${b.creationTime}`).getTime() - new Date(`${a.creationDate} ${a.creationTime}`).getTime();
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

    const repertoireDate = filterParam(parameters, 'repertoireDate')?.value

    return {
      institutionCode: first670?.origin || '-',
      institutionDestination: first670?.destination || '-',
      channel: filterParam(parameters, 'channel')?.value || '-',
      cukCode: cuk.cukCode || '-',
      notary: filterParam(parameters, 'notary')?.value || '-',
      repertoireNumber: filterParam(parameters, 'repertoireNumber')?.value || '-',
      repertoireDate: repertoireDate ? getDateFromDateString(new Date(repertoireDate)): '-',
      buyerDni: filterParam(parameters, 'buyerDni')?.value || '-',
      borrowerDni: filterParam(parameters, 'borrowerDni')?.value || '-',
      creationDate: getDateFromDateString(first670?.NSE?.createdAt as Date) || '-', // NSR.createdAt
      creationTime: getTimeFromDateString(first670?.NSE?.createdAt as Date) || '-', // NSR.createdAt
      NSE: first670?.NSE?.id || 0,
      recievedDate: getDateFromDateString(first670?.NSR?.createdAt as Date) || '-', // NSE.createdAt
      recievedTime: getTimeFromDateString(first670?.NSR?.createdAt as Date) || '-', // NSE.createdAt
      NSR: first670?.NSR?.id || 0,
      rejectedCount: cuk.messages?.filter((message) => message.messageCode === '672' || message.messageCode === '678').length ||0,
      rejectedCreationDate: getDateFromDateString(last672?.NSE?.createdAt as Date) || '-', // NSE.createdAt  last 672
      rejectedCreationTime: getTimeFromDateString(last672?.NSE?.createdAt as Date) || '-', // NSE.createdAt last 672
      lastRejectedMessageNumber: last672?.NSE?.id || 0, //  NSE.id last 672
      resendCreationDate: getDateFromDateString(last670?.NSE?.createdAt as Date) || '-',  // NSE.createdAt ,670
      resendCreationTime: getTimeFromDateString(last670?.NSE?.createdAt as Date) || '-', // NSE.createdAt ,670
      resendMessageNumber: last670?.NSE?.id || 0,// // NSE.id ,670
      acceptedCreationDate: getDateFromDateString(last671?.NSE?.createdAt as Date) || '-',  // NSE.createdAt 672
      acceptedCreationTime: getTimeFromDateString(last671?.NSE?.createdAt as Date) || '-',  // NSE.createdAt 672
      acceptedMessageNumber: last671?.NSE?.id || 0,  // NSE.id 672
      signedReceivedDate: getDateFromDateString(filterParam(parameters, 'buyerDni')?.updatedAt as Date), // document.createdAt last 670 parameter.name ='senderSigned'.updateAt
      signedReceivedTime: getTimeFromDateString(filterParam(parameters, 'buyerDni')?.updatedAt as Date), // document.createdAt last 670 parameter.name ='senderSigned'.updateAt
      liquidationCreationDate: getDateFromDateString(last674?.NSE?.createdAt as Date) || '-', // NSR.createdAt first 674
      liquidationCreationTime: getTimeFromDateString(last674?.NSE?.createdAt as Date) || '-', // NSR.createdAt first 674
      liquidationMessageNumber: last674?.NSE?.id || 0, // NSR.id first 674
      confirmationCreationDate: getDateFromDateString(message679?.NSE?.createdAt as Date) || '-',  // NSE.createdAt 679
      confirmationCreationTime: getTimeFromDateString(message679?.NSE?.createdAt as Date) || '-', // NSE.createdAt 679
      confirmationMessageNumber: message679?.NSE?.id || 0, // NSE.id
    }
  })
  return preparedCuk;
}