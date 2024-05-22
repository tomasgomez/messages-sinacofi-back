import { Message } from '@/backend/entities/message/message';

function prepareMessages(messages: Message[]): any{
    let preparedData = messages.map((message) => {
      let status = '';
      if (message.status && message.status.length > 0) {
        status = message.status[0].id;
      }
  
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