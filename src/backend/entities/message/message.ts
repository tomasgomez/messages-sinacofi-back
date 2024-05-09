import {
    IMessage,
    Parameter
} from './interface';
import {
    getChileanTime
} from '../../utils/functions';
import {
    Documents
} from '@/backend/entities/message/interface';


export class Message implements IMessage {
    id ? : string;
    TSN ? : number | null;
    OSN ? : number | null;
    NSE ? : number | null;
    LSN ? : number | null;
    NSR ? : number | null;
    NSQ ? : number | null;
    messageCode ? : string | null;
    description ? : string | null;
    priority ? : string | null;
    status ? : string | null;
    sender ? : string | null;
    creationDate ? : string | null;
    creationTime ? : string | null;
    receiver ? : string | null;
    receivedDate ? : string | null;
    receivedTime ? : string | null;
    documents ? : Documents[];
    actions ? : any;
    parameters? : Parameter[] ;
    cukCode ? : string | null;
    cuk ? : any;

    constructor() {}

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