import { Message } from '@/backend/entities/message/message';
import { getDescriptionByType } from '@/backend/entities/message/types';

function prepareMessages(messages: Message[], filter: any = {detail:false}): any{
    
  let message670 = messages.filter(message => message.messageCode == "670");

  let preparedData = messages.map((message) => {
      let status = '';

      /* If the filter has a status then filter the messages statuses*/
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

        let filterOrigin = filter.institutionCode ? filter.institutionCode [0] : filter.origin[0];

        if((message670[0].origin == filterOrigin) && ["670","674","676","677"].includes(message.messageCode!)){
          statusFilered = statusFilered?.filter(d => d.id != '06')
        } else {
          statusFilered = statusFilered?.filter(d => d.id != '05' && d.id != '01')
        }
      }
      status = statusFilered
            ?.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)) // Descending order
            ?. [0]?.id ?? ''; // Get the first element's id or return an empty string
  
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
        actions: message?.actions ?? '',
        cukCode: message?.cukCode ?? '',
        status,
      }});
  
      return preparedData
  }

  export { prepareMessages }


  // 670 y 674 (enviador)
  // 671, 672, 673 y 675 (receptor)