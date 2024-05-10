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
  MessageTypes
} from '@/backend/entities/message/types';
import {
  getSchema
} from '../schema/getSchema';
import {
  MessageRepository
} from '@/backend/repository/messageRepository';
import {
  MessageStatus
} from '@/backend/entities/message/status';
import {
  MessageSchema
} from '@/backend/entities/schema/messageSchema';
import {
  MessageDescriptions
} from '@/backend/entities/message/types';
import {
  matchSchemaWithMessage
} from '@/backend/utils/foreclosure';

export async function updateForclosure(cukRepository: CUKRepository, messageRepository: MessageRepository, cuk: CUK, message: Message): Promise < CUK | Error > {
  try {

    if (!cuk?.cukCode) {
      throw new Error('Invalid CUK');
    }

    let schema: MessageSchema[] | Error;
    let newMessage: Message | Error;
    let createdMessage: Message | Error;

    let messageType = '';
    let messageDescription = '';

    switch (cuk.status) {
      case ForeclosureStatus.IN_PROCESS:
        cuk.status = ForeclosureStatus.IN_PROCESS;
        break;

      case ForeclosureStatus.APPROVED:
        cuk.status = ForeclosureStatus.APPROVED;
        break;

      case ForeclosureStatus.REJECTED: // 672
        messageType = MessageTypes.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO
        messageDescription = MessageDescriptions.RECHAZO_DE_ALZAMIENTO_HIPOTECARIO
        cuk.status = ForeclosureStatus.REJECTED;
        break;

      case ForeclosureStatus.START_NORMALIZATION: // 673
        messageType = MessageTypes.AVISO_DE_CLIENTE_EN_NORMALIZACION
        messageDescription = MessageDescriptions.AVISO_DE_CLIENTE_EN_NORMALIZACION
        cuk.status = ForeclosureStatus.START_NORMALIZATION;
        break;

      case ForeclosureStatus.END_NORMALIZATION:
        cuk.status = ForeclosureStatus.END_NORMALIZATION;
        break;

      case ForeclosureStatus.SIGN_IN_PROGRESS:
        cuk.status = ForeclosureStatus.SIGN_IN_PROGRESS;
        break;

      case ForeclosureStatus.SIGNED: // 671
        messageType = MessageTypes.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO
        messageDescription = MessageDescriptions.ACEPTACION_DE_ALZAMIENTO_HIPOTECARIO
        cuk.status = ForeclosureStatus.SIGNED;
        break;

      default:
        throw new Error('Invalid status');
    }

    if (messageType != '') {
      /* Get the schema for the message */
      schema = await getSchema(messageType, cuk.cukCode);
      if (schema instanceof Error || !schema || schema.length == 0) {
        throw new Error('Schema not found');
      }

      /* Match the schema with the message */
      newMessage = matchSchemaWithMessage(schema, cuk);
      if (newMessage instanceof Error) {
        throw message;
      }

      /* Set the message status and cukCode */
      newMessage.cukCode = cuk.cukCode;
      newMessage.status = '-';
      newMessage.messageCode = messageType;
      newMessage.description = messageDescription;

      /* Create the message */
      createdMessage = await createMessage(messageRepository, newMessage);

      if (createdMessage instanceof Error) {
        throw createdMessage;
      }

      console.log('Message created:', createdMessage);
    }

    const createdCuk = await cukRepository.update(cuk);

    if (createdCuk instanceof Error) {
      throw createdCuk;
    }

    return createdCuk;
  } catch (error: any) {
    console.error('Error creating foreclosure:', error);
    return error;
  }
}