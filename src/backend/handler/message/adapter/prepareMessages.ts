import { FilterMessage } from '@/backend/entities/message/filter';
import { Message } from '@/backend/entities/message/message';

function prepareMessages(messages: Message[], filter: FilterMessage = {detail:false}): any{
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

      status = message.status
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