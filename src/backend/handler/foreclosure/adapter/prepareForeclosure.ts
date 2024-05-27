import { CUK } from '@/backend/entities/cuk/cuk';
import { prepareMessages } from '../../message/adapter/prepareMessages';

function prepareForclosure(cuks: CUK[]): any{
    let preparedData = cuks.map((cuk) => {
      if (cuk.messages)
        cuk.messages = prepareMessages(cuk.messages);

      return cuk;
    });

    let adaptedCuk = preparedData.map((cuk) => {

      let result = prepareParametersForCuk(cuk);

      delete result.parameters;

      return result;
    });

    return adaptedCuk
  }

  export { prepareForclosure }

  function prepareParametersForCuk(cuk: CUK): any {
    let adaptedCuk: any = {
      ...cuk
    }

    cuk.parameters?.forEach((parameter) => {
      switch (parameter.name) {
        case 'channel': 
          adaptedCuk.channel = parameter.value;
          break;
        case 'bank':
          adaptedCuk.institutionDestination = parameter.value;
          break;
        case 'region':
          adaptedCuk.region = parameter.value;
          break;
        case 'buyerDni':
          adaptedCuk.buyerDni = parameter.value;
          break;
        case 'buyer':
          adaptedCuk.buyer = parameter.value;
          break;
        case 'ownerDni':
          adaptedCuk.ownerDni = parameter.value;
          break;
        case 'owner':
          adaptedCuk.owner = parameter.value;
          break;
        case 'borrowerDni':
          adaptedCuk.borrowerDni = parameter.value;
          break;
        case 'borrower':
          adaptedCuk.borrower = parameter.value;
          break;
      }
    });

    return adaptedCuk;
  }