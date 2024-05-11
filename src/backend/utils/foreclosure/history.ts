import { CUK } from '@/backend/entities/cuk/cuk';
import { History } from '@/backend/entities/cuk/history';

/* Function to transform history from Json and set it to CUK */
export function setCukHistory(cuk: CUK): History[] {

    // Check if history exists
    if (cuk.history && typeof cuk.history === 'string' && cuk.history.trim() !== '') {
        
        // Parse Json
        let historyArray = JSON.parse(cuk.history);

        // Check if historyArray is an array
        if (Array.isArray(historyArray)) {
            cuk.history = historyArray.map((history: History) => {
                return {
                    cukCode: history.cukCode,
                    status: history.status,
                    date: history.date
                }
            });
        }
    } 
    return cuk.history ? cuk.history : [];
}


/* Function to add history to CUK if status changes */
export function addHistory(status: string, cuk: CUK): string {
    let history: History = {
        cukCode: cuk.cukCode ?? '',
        status: status ?? '',
        date: new Date().toISOString()
    };

    let updatedHistoryArray: any[] = [];

    // Check if history exists
    if (cuk.history && typeof cuk.history === 'string' && cuk.history.trim() !== '') {

        // Parse Json
        let historyArray = JSON.parse(cuk.history);

        // Check if historyArray is an array
        if (Array.isArray(historyArray)) {
            updatedHistoryArray = historyArray;
        }
    } 

    updatedHistoryArray.push(history);

    // Stringify the modified history array
    return JSON.stringify(updatedHistoryArray);
}