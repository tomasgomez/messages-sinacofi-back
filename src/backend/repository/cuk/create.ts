import {
    ICUK
} from '@/backend/entities/cuk/interface';
import {
    PrismaClientWrapper
} from '../prismaWrapper';
import {
    CUK
} from '@/backend/entities/cuk/cuk';
import {
    History
} from '@/backend/entities/cuk/history';

async function create(cuk: CUK): Promise < CUK | Error > {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        let cukData: Partial<ICUK> = {};

        /* Set the time for the CUK */
        if (cuk.setTime) {
            cuk.setTime();
        }

        /* Set the history for the CUK */
        let history: History = {
            status: cuk.status ?? '',
            cukCode: cuk.cukCode ?? '',
            date: new Date().toString(),
        };

        let historyAsString = JSON.stringify(history);

        cukData.history = historyAsString;

        /* Add all the attributes to the new CUK */
        if (Object.keys(cuk).length > 0) {
            for (const [key, value] of Object.entries(cuk)) {
                if (value !== undefined && key in cuk) {
                    cukData[key as keyof ICUK] = value;
                }
            }
        } else {
            console.error('No CUK data provided');
            return new Error('No CUK data provided');
        }

        let newCUK = await prismaClient.cUK.create({
            data: cukData
        });

        if (newCUK === null) {
            console.error('Error creating CUK');
            return new Error('Error creating CUK');
        }

        return newCUK as CUK;

    } catch (error: any) {
        console.error('Error creating CUK:', error);
        return error;
    }
}

export {
    create
};