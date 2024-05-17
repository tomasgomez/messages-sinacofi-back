import { getChileanTime } from '@/backend/utils/functions'
import { Parameter } from '@/backend/entities/message/parameter'
import { History } from '@/backend/entities/cuk/history'
import { Message } from '@/backend/entities/message/message'
export class CUK {
    id?: string;    
    cukCode?: string | null;
    status?: string | null;

    creationDate?: string | null;

    parameters?: Parameter[] | null;
    history?: History[] | null;
    messages?: Message[] | null;

    
    createdAt?: Date;
    updatedAt?: Date;

    setTime ? () {

        /* Get the Chilean time */
        let response = getChileanTime();

        if (response instanceof Error) {
            return response;
        }

        let [dateString, time] = response;

        this.creationDate = dateString + ' ' + time;
    }

    // addMessage ? (message: any) {
    //     if (!this.messages) {
    //         this.messages = [];
    //     }

    //     this.messages.push(message);
    // }

    setCukCode ? (institutionCode: string) {
        // AH00010000000040
        let randomNumber = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
        let paddedRandomNumber = randomNumber.toString().padStart(8, '0'); // Pads the number with zeros to make it 8 digits long
        let code = 'AH000' + institutionCode + paddedRandomNumber;
        this.cukCode = code
    }
}