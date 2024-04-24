import { ICUK } from './interface';
import { getChileanTime } from '../../utils/functions';

export class CUK implements ICUK {
    id?: string;
    name?: string | null;
    description?: string | null;
    creationDate?: string | null;
    
    cukCode?: string | null;
    foreclosureDate?: string | null;
    channel?: string | null;
    status?: string | null;
    clientDni?: string | null;
    clientName?: string | null;
    institutionDestination?: string | null;

    messages?: any[];


    constructor() {
    }

    setTime ? () {

        /* Get the Chilean time */
        let response = getChileanTime();

        if (response instanceof Error) {
            return response;
        }

        let [dateString, time] = response;

        this.creationDate = dateString + ' ' + time;
    }

    addMessage ? (message: any) {
        if (!this.messages) {
            this.messages = [];
        }

        this.messages.push(message);
    }

    setCukCode ? () {
        // AH00010000000040
        this.cukCode = 'AH0001' + Math.floor(Math.random() * 10000000000);
    }
}