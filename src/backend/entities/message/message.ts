import {
    getChileanTime
} from '@/backend/utils/functions';

export class Message {
    id ? : string;
    messageCode ? : string | null;
    origin ? : string | null;
    destination ? : string | null;
    originArea ? : string | null;
    destinationArea ? : string | null;
    creationDate ? : string | null;
    creationTime ? : string | null;
    receivedDate ? : string | null;
    receivedTime ? : string | null;
    actions ? : string | null;
    createdAt ? : Date;
    updatedAt ? : Date;

    statusId ? : string | null;
    cukCode ? : string | null;

    setTime ? () {

        /* Get the Chilean time */
        let response = getChileanTime();

        if (response instanceof Error) {
            return response;
        }

        let [dateString, time] = response;

        this.creationDate = dateString;
        this.creationTime = time;
    }

    setReceivedTime ? () {
        /* Get the Chilean time */
        let response = getChileanTime();

        if (response instanceof Error) {
            return response;
        }

        let [dateString, time] = response;

        this.receivedDate = dateString
        this.receivedTime = time;
    }
}