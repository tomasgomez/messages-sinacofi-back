import { CUK } from '@/backend/entities/cuk/cuk';
import { prepareMessages } from '../../message/adapter/prepareMessages';

function prepareForclosure(cuks: CUK[]): any{
    let preparedData = cuks.map((cuk) => {
      if (cuk.messages)
        cuk.messages = prepareMessages(cuk.messages);

      return cuk;
    });

      return preparedData
  }

  export { prepareForclosure }