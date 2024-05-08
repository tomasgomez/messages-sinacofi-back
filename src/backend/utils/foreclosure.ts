import {
    Message
} from '@/backend/entities/message/message';
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

export function getParameterConfig(parameterName: string): {
    key: string;name ? : string
} | undefined {
    return parameters[parameterName];
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

const parameters: {
    [key: string]: {
        key: string;name ? : string
    }
} = {
    'descriptionTypeMessage': {
        key: 'description',
        name: 'name'
    },
    'emissionDate': {
        key: 'foreclosureDate'
    },
    'channel': {
        key: 'channel'
    },
    'buyer': {
        key: 'clientName'
    },
    'rutBuyer': {
        key: 'clientDni'
    }
};