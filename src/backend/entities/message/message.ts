import {
    getChileanTime
} from '@/backend/utils/functions';
import { Parameter } from './parameter';
import { Document } from '@/backend/entities/global/document';
import { TSN, LSN, OSN, NSE, NSR, NSQ } from './correlatives';
import { Status } from './status';

export class Message {
    [key: string]: unknown;

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

    TSN ? : TSN;
    LSN ? : LSN;
    OSN ? : OSN;
    NSE ? : NSE;
    NSR ? : NSR;
    NSQ ? : NSQ;

    parameters ? : Parameter[];
    documents ? : Document[];

    status ? : Status[] ;
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

    getStatus ? () {
        // get the first status
        return this.status?.[0]?.id ?? '';

    }
}