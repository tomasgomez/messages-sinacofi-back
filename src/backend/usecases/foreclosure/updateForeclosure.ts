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
  MessageDescriptions
} from '@/backend/entities/message/types';
import {
  MessageRepository
} from '@/backend/repository/messageRepository';

export async function updateForclosure(cukRepository: CUKRepository, messageRepository: MessageRepository, cuk: CUK, message: Message): Promise < CUK | Error > {
  try {

    if (!cuk?.cukCode) {
      return new Error('Invalid CUK');
    }

    /* Set variables */
    let hasToUpdateMessage = false;
    let newMessage: Message;
    let messageType = '';
    let messageDescription = '';

    if (!cuk.cukCode || cuk.cukCode === '') {
      return new Error('Invalid CUK');
    }

    /* Check if is updating cuk status and set the new status with new message values */
    switch (cuk.status) {
      case ForeclosureStatus.SIGNED: // 671
        messageType = MessageTypes.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO
        messageDescription = MessageDescriptions.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO
        cuk.status = ForeclosureStatus.SIGNED;
        hasToUpdateMessage = true;
        break;

      case ForeclosureStatus.REJECTED: // 672
        messageType = MessageTypes.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO
        messageDescription = MessageDescriptions.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO
        cuk.status = ForeclosureStatus.REJECTED;
        hasToUpdateMessage = true;
        break;

      case ForeclosureStatus.START_NORMALIZATION: // 673
        messageType = MessageTypes.AVISO_DE_CLIENTE_EN_NORMALIZACION
        messageDescription = MessageDescriptions.AVISO_DE_CLIENTE_EN_NORMALIZACION
        cuk.status = ForeclosureStatus.START_NORMALIZATION;
        hasToUpdateMessage = true;
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

      default:
        return new Error('Invalid status');
    }

    /* When the cuk status is being updated, a message is created or updated the last message */
    if (hasToUpdateMessage) {
      newMessage = new Message();
      newMessage.cukCode = cuk.cukCode;
      newMessage.status = '';
      newMessage.messageCode = messageType;
      newMessage.description = messageDescription;

      await updateLastMessage(newMessage, messageRepository, cukRepository);
    }

    const createdCuk = await cukRepository.update(cuk);

    if (createdCuk instanceof Error) {
      return createdCuk;
    }

    return createdCuk;
  } catch (error: any) {
    console.error('Error creating foreclosure:', error);
    return error;
  }
}

/* When the cuk status is being updated, an empty message is created or updated the last empty message */
async function updateLastMessage(message: Message, messageRepository: MessageRepository, cukRepository: CUKRepository) {
  
  if (!message.cukCode) {
    return;
  }
  
  /* Get Cuk */
  let fetchedCuk = await cukRepository.find({
    cukCode: [message.cukCode]
  });  
  
  /* Check last message attached to the CUK */
  if (fetchedCuk instanceof Error || fetchedCuk.length === 0) {
    return;
  }

  /* Set the receiver of the message */
  message.receiver = fetchedCuk[0].institutionDestination;

  let fetchedMessages = fetchedCuk[0].messages;

  if (!fetchedMessages) {
    fetchedMessages = [];
  }

  /* Sorts from newest to oldest */
  fetchedMessages = fetchedMessages.sort((a, b) => {
    if (!a.createdAt || !b.createdAt) {
      return 0;
    } else if (a.createdAt === b.createdAt) {
      return 0;
    } else if (a.createdAt > b.createdAt) {
      return -1; 
    } else {
      return 1;
    }
  });


  /* If the last message is not empty, create a new empty one */
  if (fetchedMessages.length === 0 || fetchedMessages[0].status !== '') {
    createMessage(messageRepository, message);

    /* If the last message is empty, update the last message */
  } else {

    let messageToUpdate = fetchedMessages[0];

    messageToUpdate.status = '';
    messageToUpdate.messageCode = message.messageCode;
    messageToUpdate.receiver = message.receiver;
    messageToUpdate.description = message.description;
    messageToUpdate.actions = '';

    messageRepository.update(messageToUpdate);
  }
}