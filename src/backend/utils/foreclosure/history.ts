import { CUK } from '@/backend/entities/cuk/cuk';
import { History } from '@/backend/entities/cuk/history';

/* Function to transform history from Json and set it to CUK */
export function setCukHistory(cuk: CUK): History[] {
    return [];
}


/* Function to add history to CUK if status changes */
export function addHistory(status: string, cuk: CUK): string {
    let history: History = {
        cukCode: cuk.cukCode ?? '',
        status: status ?? '',
        date: new Date().toISOString()
    };

    let updatedHistoryArray: any[] = [];


    updatedHistoryArray.push(history);

    // Stringify the modified history array
    return JSON.stringify(updatedHistoryArray);
}