import { MessageActions } from '@/backend/entities/message/actions';
import { Message } from '@/backend/entities/message/message';
import { getDescriptionByType, MessageTypes } from '@/backend/entities/message/types';
import { stat } from 'fs';

function prepareMessages(messages: Message[], filter: any = {detail:false}): any{
    
  /* Find the message with the code 670 */
  let message670 = messages.filter(message => message.messageCode == "670");

  /* Prepare the data for each message */
  let preparedData = messages.map((message) => {
      let status = '';

      /* If the filter has a status then filter the messages statuses */
      if (filter.status && filter.status.length > 0) {
        messages = messages.map(message => {
            const filteredStatuses = message.status?.filter(s => filter?.status?.includes(s.id));
            return {
                ...message,
                status: filteredStatuses
            };
        }).filter(message => message.status && message.status.length > 0);
      }
      
      let statusFilered = message.status;

      if (message670.length > 0 && (filter.origin?.length > 0 || filter.institutionCode?.length > 0)){

        /* Filter the statuses messages depending on the sender or receiver */
        
        // Check if the message is a sender or receiver
        let filterOrigin = filter.institutionCode ? filter.institutionCode[0] : filter.origin[0];
        let isSender = message670[0].origin == filterOrigin ? true : false;
        let isReceiver = !isSender;

        // Sender
        if(isSender && SenderMessageCodes.includes(message.messageCode!)) {
          statusFilered = statusFilered?.filter(d => d.id != '06')
        } else if (isSender && ReceiverMessageCodes.includes(message.messageCode!)) {
          statusFilered = statusFilered?.filter(d => d.id != '05' && d.id != '01')
          
        // Receiver
        } else if (isReceiver && SenderMessageCodes.includes(message.messageCode!)) {
          statusFilered = statusFilered?.filter(d => d.id != '05' && d.id != '01')
        } else if (isReceiver && ReceiverMessageCodes.includes(message.messageCode!)) {
          statusFilered = statusFilered?.filter(d => d.id != '06')
          if (message.messageCode == '678' || message.messageCode == '679' && statusFilered?.length == 1) { //TODO: replace this with a better condition
            statusFilered = statusFilered?.filter(d => d.id != '01')
          }
        }

        if (isReceiver) {
          let actions = []
          if (message.messageCode != MessageTypes.DATOS_PARA_EL_PAGO_AH) {
            actions.push(MessageActions.SHOW_DETAIL)
          }

          message.actions = actions.join(',')
        }
      }

      // Sort the statuses by id and get the last one
      status = statusFilered
            ?.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)) // Descending order
            ?. [0]?.id ?? ''; // Get the first element's id or return an empty string

      // Prepare the documents
      let documents = message.documents?.map(document => {
          return {
              id: document.id,
              url: document.url,
              documentName: document.documentName,
              document: document.content
          }
      });

      return {
        ...message,
        TSN: message?.TSN?.id,
        LSN: message?.LSN?.id,
        OSN: message?.OSN?.id,
        NSE: message?.NSE?.id,
        NSR: message?.NSR?.id,
        NSQ: message?.NSQ?.id,
        description: getDescriptionByType(message.messageCode ?? ''),
        origin: message?.origin ?? '',
        destination: message?.destination ?? '',
        originArea: message?.originArea ?? '',
        destinationArea: message?.destinationArea ?? '',
        receivedDate: message?.receivedDate ?? '',
        receivedTime: message?.receivedTime ?? '',
        actions: message?.actions?.split(','),
        cukCode: message?.cukCode ?? '',
        status,
        documents,
      }}).filter(message => message.status != '' && message.status != '-');
  
      return preparedData
  }

  export { prepareMessages }


  const SenderMessageCodes = ["670","674","677"];
  const ReceiverMessageCodes = ["671", "672", "673", "675","676","678", "679"];