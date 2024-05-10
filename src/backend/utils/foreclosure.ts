import {
    Message
} from '@/backend/entities/message/message';
import {
    MessageSchema
} from '@/backend/entities/schema/messageSchema';
import {
    Parameter
} from '@/backend/entities/message/interface';
import {
    CUK
} from '@/backend/entities/cuk/cuk';
import {
    isForeclosureMessageCode
  } from '@/backend/entities/cuk/codes';

export function isValidMessage(message: Message): boolean {
    let isForeclosure = isForeclosureMessageCode(message.messageCode ?? '');

    if (!isForeclosure) {
        return false;
    }

    return true;
}

export function processMessageParameters(parameters: any[] | undefined, cuk: CUK): void {

    if (!parameters) {
        return;
    }
    for (const parameter of parameters) {

        const paramConfig = getParameterConfig(parameter.name);
        if (!paramConfig || !parameter.name || !parameter.value || parameter.value === '' || parameter.name === '') {
            continue;
        }
        cuk[paramConfig.key as keyof CUK] = parameter.value;
        if (paramConfig.name) {
            cuk[paramConfig.name as keyof CUK] = parameter.value;
        }
    }
}

export function getParameterConfig(parameterName: string): {key: string ; name ? : string} | undefined {
    return parametersToAdd[parameterName];
}

export function setInstitutionCode(cuk: CUK, institutionCode: string | undefined | null): void {
    if (institutionCode) {
        cuk.institutionCode = institutionCode;
    }
}

export function setCukDestination(cuk: CUK, receiver: string | undefined | null): void {
    if (receiver) {
        cuk.institutionDestination = receiver;
        if (cuk.setCukCode) {
            cuk.setCukCode(receiver);
        }
    }
}

export function setCukStatus(cuk: CUK, status: string | null | undefined): void {
    if (status) {
        cuk.status = status;
    }
}

export function matchSchemaWithMessage(schema: any, cuk: CUK): Message | Error {
    if (!schema.parameters) {
      return new Error('Invalid schema');
    }
  
    let newMessage = new Message();
  
    const parametersUpdated = schema.parameters.map((params: any) => {
        let parameter: Parameter = {
          id: params.name,
          name: params.name,
          value: params.value,
          label: params.label,
        };
  
        if (schema && schema.name == 'CUK'){
          parameter.defaultValue = cuk.cukCode ;
        }
  
        return parameter;
    });
  
    newMessage.parameters = parametersUpdated; 
  
    return newMessage;
  }

const parametersToAdd: {
    [key: string]: {
        key: string;name ? : string
    }
} = {
    "messageDescription": {
        "key": "description",
        "name": "name"
    },
    "issuedDate": {
        "key": "issuedDate"
    },
    "channel": {
        "key": "channel"
    },
    "region": {
        "key": "region"
    },
    // COMPRADOR
    "buyer": {
        "key": "buyer"
    },
    "buyerDni": {
        "key": "buyerDni"
    },
    // DEUDOR
    "borrowerDni" : {    
        "key": "borrowerDni"
    },
    "E32_2": {
        "key": "borrower"
    },
    // VENDEDOR
    "ownerDni": {
        "key": "ownerDni"
    },
    "owner": {
        "key": "owner"
    },
};
