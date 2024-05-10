import {
    PrismaClientWrapper
} from '../prismaWrapper';
import {
    CUK
} from '@/backend/entities/cuk/cuk';
import {
    History
} from '@/backend/entities/cuk/history';


export async function update(cuk: CUK): Promise < CUK | Error > {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        let where: {
            id ? : string;
            cukCode ? : string;
        } = {};

        let updatedCuk: CUK | Error = new Error('Not Updating CUK');

        if (cuk.cukCode) {
            where = {
                cukCode: cuk.cukCode ?? undefined
            };
        } else if (cuk.id && typeof cuk.id === 'string') {
            where = {
                id: cuk.id
            };
        }

        if (cuk.status) {
            updatedCuk = await prismaClient.$transaction(async (prisma) => {
                // Fetch the object from the database within the transaction
                let fetchedCuk = await prismaClient.cUK.findFirst({
                    where,
                });

                if (!fetchedCuk) {
                    return new Error('CUK not found');
                }

                if (cuk.status === fetchedCuk.status) {
                    return fetchedCuk;
                }

                let history: History = {
                    cukCode: fetchedCuk.cukCode ?? '',
                    status: fetchedCuk.status ?? '',
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
                const updatedHistory = JSON.stringify(updatedHistoryArray);


                // Update the object with the new history array
                return await prisma.cUK.update({
                    where: {
                        id: fetchedCuk.id,
                    },
                    data: {
                        status: cuk.status,
                        history: updatedHistory,
                    },
                });
            });
        }

        return updatedCuk;

    } catch (error: any) {
        console.error('Error updating cuk:', error);
        return error;
    }
}

