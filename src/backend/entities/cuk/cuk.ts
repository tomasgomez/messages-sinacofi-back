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
    rutSeller?: string | null;
    region?: string | null;
    debtorRut?: string | null;

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

    setCukCode ? (institutionCode: string) {
        // AH00010000000040
        let code = 'AH000'+ institutionCode + Math.floor(Math.random() * 10000000000);
        console.log('Cuk code created:', code);
        this.cukCode = code
        console.log('Cuk code in the cuk obkect:', this.cukCode);
    }
}