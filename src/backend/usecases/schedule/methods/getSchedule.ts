import { CUKRepository } from '../../../repository/cukRepository';
import { MessageRepository } from '@/backend/repository/messageRepository';
import { CUK } from '@/backend/entities/cuk/cuk';
import { ForeclosureStatus } from '@/backend/entities/cuk/codes';
import { MessageTypes } from '@/backend/entities/message/types';
import { Message } from '@/backend/entities/message/message';
import { MessageActions } from '@/backend/entities/message/actions';

// Get message function
export async function getSchedule(cukRepository: CUKRepository, messageRepository: MessageRepository): Promise < Error | void > {
  try {

    /* Run get cuk paginating by 10 */
    let pages = 0;
    let count = 10;

    /* Get total of CUKs */
    let totalCuk = await cukRepository.getTotal({
      status: [ForeclosureStatus.SENT_REJECTION],
    });

    if (totalCuk instanceof Error) {
      return totalCuk;
    }

    let total = parseInt(totalCuk);

    if (total > 0) {
      pages = Math.ceil(total / count);
    }

    /* Loop through pages */
    for (let page = 0; page < pages; page++) {
      let cuk = await cukRepository.find({
        status: [ForeclosureStatus.SEND_LIQUIDATION_PAYMENT],
        count: count.toString(),
        offset: (page * count).toString(),
        include: {
          parameters: false,
          documents: false
        }
      });

      if (cuk instanceof Error) {
        continue;
      }

      let cukCodes = cuk.data.map((c: CUK) => c.cukCode ?? '');

      /* Get messages */
      let messages = await messageRepository.find({
        cukCode: cukCodes,
        messageCode: [MessageTypes.SOLICITUD_DE_ALZAMIENTO_HIPOTECARIO, MessageTypes.LIQUIDACION_DE_PREPAGO_DE_ALZAMIENTO_HIPOTECARIO, MessageTypes.DATOS_PARA_EL_PAGO_AH, MessageTypes.AVISO_DE_PAGO_AH]
      }, false, false);

      if (messages instanceof Error) {
        continue;
      }

      let message675 = messages.find((m: any) => m.messageCode === MessageTypes.LIQUIDACION_DE_PREPAGO_DE_ALZAMIENTO_HIPOTECARIO);
      let message677 = messages.find((m: any) => m.messageCode === MessageTypes.AVISO_DE_PAGO_AH);

      if (message675 && message675.createdAt && message677 && message677.createdAt) {
        let liquidationDate = new Date(message675.createdAt);
        let paymentDate = new Date(message677.createdAt);

        /* The difference of hours cant be higher than 24 */
        if (Math.abs(liquidationDate.getHours() - paymentDate.getHours()) <= 24) {
          console.log('Schedule is ok');
        } else {
          messages.forEach(async (message: Message) => {
            
            let actions: string[] = [];

            switch (message.messageCode) {
              case MessageTypes.SOLICITUD_DE_ALZAMIENTO_HIPOTECARIO:
                actions.push(MessageActions.EDIT);
                break;
              case MessageTypes.DATOS_PARA_EL_PAGO_AH:
                actions.push(MessageActions.SHOW_DETAIL); //TODO: Print disabled
                break;
              default:
                actions.push(MessageActions.SHOW_DETAIL);
                break;
            }

            await messageRepository.update({
              id: message.id,
              actions: actions.join(','),
            });
          });
        }
      }
    }

    console.log('Messages scheduled successfully');

  } catch (error: any) {
    console.error('Error on cronjob:', error);
    return error;
  }
}