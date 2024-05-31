import {
  CUKRepository
} from '../../repository/cukRepository';
import {
  CUK
} from '../../entities/cuk/cuk';
import {
  Message
} from '../../entities/message/message';
import {
  ForeclosureStatus
} from '@/backend/entities/cuk/codes';
import {
  createMessage
} from '../message/createMessage';
import {
  MessageTypes,
} from '@/backend/entities/message/types';
import {
  MessageRepository
} from '@/backend/repository/messageRepository';

export async function updateForclosure(cukRepository: CUKRepository, messageRepository: MessageRepository, cuk: CUK, message: Message): Promise < CUK | Error > {
  try {

    if (!cuk?.cukCode) {
      return new Error('Invalid CUK');
    }

    console.log('Cuk:', cuk);

    /* Set variables */
    let newMessage: Message;
    let messageType = '';
    let hasToUpdateMessage = false;
    let origin = '';
    let destination = '';

    if (!cuk.cukCode || cuk.cukCode === '') {
      return new Error('Invalid CUK');
    }

    let fetchedMessage = await messageRepository.find({
      cukCode: [cuk.cukCode],
      messageCode: [MessageTypes.ALZAMIENTO_HIPOTECARIO],
      detail: false
    });

    if (fetchedMessage instanceof Error) {
      return new Error('Error fetching message');
    }
    
    newMessage = new Message();
    
    if (fetchedMessage instanceof Array && fetchedMessage.length > 0) {
      origin = fetchedMessage[0].destination ?? '';
      destination = fetchedMessage[0].origin ?? '';
    }

    /* Check if is updating cuk status and set the new status with new message values */
    switch (cuk.status) {
      case ForeclosureStatus.SIGNED: // 671
      messageType = MessageTypes.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO
      cuk.status = ForeclosureStatus.SIGNED;
      hasToUpdateMessage = true;
      newMessage.origin = origin;
      newMessage.destination = destination;
        break;

      case ForeclosureStatus.REJECTED: // 672
        messageType = MessageTypes.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO
        cuk.status = ForeclosureStatus.REJECTED;
        hasToUpdateMessage = true;
        newMessage.origin = origin;
        newMessage.destination = destination;
        break;

      case ForeclosureStatus.START_NORMALIZATION: // 673
        messageType = MessageTypes.AVISO_DE_CLIENTE_EN_NORMALIZACION
        cuk.status = ForeclosureStatus.START_NORMALIZATION;
        hasToUpdateMessage = true;
        newMessage.origin = origin;
        newMessage.destination = destination;

        break;

      case ForeclosureStatus.IN_PROCESS:
        cuk.status = ForeclosureStatus.IN_PROCESS;
        break;

      case ForeclosureStatus.APPROVED:
        cuk.status = ForeclosureStatus.APPROVED;
        break;

      case ForeclosureStatus.END_NORMALIZATION:
        cuk.status = ForeclosureStatus.END_NORMALIZATION;
        break;

      case ForeclosureStatus.SIGN_IN_PROGRESS:
        cuk.status = ForeclosureStatus.SIGN_IN_PROGRESS;
        break;

      case ForeclosureStatus.ACCEPTED: //674
        messageType = MessageTypes.SOLICITUD_DE_ALZAMIENTO_HIPOTECARIO
        cuk.status = ForeclosureStatus.ACCEPTED;
        hasToUpdateMessage = true;
        newMessage.origin = destination;
        newMessage.destination = origin;
        break;

      case ForeclosureStatus.SENT_LIQUIDATION: // 675
        messageType = MessageTypes.LIQUIDACION_DE_PREPAGO_DE_ALZAMIENTO_HIPOTECARIO
        cuk.status = ForeclosureStatus.SENT_LIQUIDATION;
        hasToUpdateMessage = true;
        newMessage.origin = origin;
        newMessage.destination = destination;
        break;
      
      case ForeclosureStatus.PAYMENT_DATA: // 676
        messageType = MessageTypes.DATOS_PARA_EL_PAGO_AH
        cuk.status = ForeclosureStatus.SEND_LIQUIDATION_PAYMENT;
        hasToUpdateMessage = true;
        newMessage.origin = origin;
        newMessage.destination = destination;
        break;

      case ForeclosureStatus.SEND_LIQUIDATION_PAYMENT: // 677
        messageType = MessageTypes.AVISO_DE_PAGO_AH
        cuk.status = ForeclosureStatus.SEND_LIQUIDATION_PAYMENT;
        hasToUpdateMessage = true;
        newMessage.origin = destination;
        newMessage.destination = origin;
        break;
      
      case ForeclosureStatus.PAYMENT_OPTION_REJECTION: // 678
        messageType = MessageTypes.RECHAZO_DE_PAGO_AH
        cuk.status = ForeclosureStatus.PAYMENT_OPTION_REJECTION;
        hasToUpdateMessage = true;
        newMessage.origin = origin;
        newMessage.destination = destination;
        break;
      
      case ForeclosureStatus.PAYMENT_OPTION_ACCEPTED: // 679
        messageType = MessageTypes.CONFIRMACION_DE_PAGO_AH
        cuk.status = ForeclosureStatus.PAYMENT_OPTION_ACCEPTED;
        hasToUpdateMessage = true;
        newMessage.origin = origin;
        newMessage.destination = destination;
        break;
      
      case ForeclosureStatus.INIT: // 670 enviado
        cuk.status = ForeclosureStatus.INIT;
        break;

      default:
        return new Error('Invalid status');
    }

    /* When the cuk status is being updated, a message is created or updated the last message */
    if (hasToUpdateMessage) {

      newMessage.cukCode = cuk.cukCode;
      newMessage.messageCode = messageType;
      
      await createMessage(messageRepository, newMessage);   
    }

    const updatedCuk = await cukRepository.update(cuk);

    console.log('Updated cuk:', updatedCuk);

    if (updatedCuk instanceof Error) {
      return updatedCuk;
    }

    return updatedCuk;
  } catch (error: any) {
    console.error('Error creating foreclosure:', error);
    return error;
  }
}
