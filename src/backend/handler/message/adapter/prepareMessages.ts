import { Message } from '@/backend/entities/message/message';

function prepareMessages(messages: Message[]): any{
    let preparedData = messages.map((message) => {
      let status = '';
      
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