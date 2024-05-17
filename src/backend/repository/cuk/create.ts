import {
    PrismaClientWrapper
} from '../prismaWrapper';
import {
    CUK
} from '@/backend/entities/cuk/cuk';
import {
    History
} from '@/backend/entities/cuk/history';
import {
    getDescriptionByStatus
} from '@/backend/entities/cuk/codes';

async function create(cuk: CUK): Promise < CUK | Error > {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        let cukData: Partial<CUK> = {};

        /* Set the time for the CUK */
        if (cuk.setTime) {
            cuk.setTime();
        }

        /* Set the history for the CUK */
        let history: History = {
            status: cuk.status ?? '' +' '+ getDescriptionByStatus(cuk.status ?? ''),
            cukCode: cuk.cukCode ?? '',
            date: cuk.creationDate ?? '',
        }

        /* Add all the attributes to the new CUK */
        if (Object.keys(cuk).length > 0) {
            for (const [key, value] of Object.entries(cuk)) {
                if (value !== undefined && key in cuk) {
                    cukData[key as keyof CUK] = value;
                }
            }
        } else {
            console.error('No CUK data provided');
            return new Error('No CUK data provided');
        }

        let newCUK = await prismaClient.cUK.create({
            data: cukData
        });

        /* Add the history to the new CUK */
        prismaClient.history.create({
            data: history
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