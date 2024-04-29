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
        let randomNumber = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
        let paddedRandomNumber = randomNumber.toString().padStart(8, '0'); // Pads the number with zeros to make it 8 digits long
        let code = 'AH000' + institutionCode + paddedRandomNumber;
        console.log('Cuk code created:', code);
        this.cukCode = code
        console.log('Cuk code in the cuk obkect:', this.cukCode);
    }
}