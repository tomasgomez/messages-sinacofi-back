import {
    ICUK
} from '@/backend/entities/cuk/interface';
import {
    PrismaClientWrapper
} from '../prismaWrapper';

async function create(cuk: ICUK): Promise < ICUK | Error > {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        let cukData: Partial<ICUK> = {};

        /* Set the time for the CUK */
        if (cuk.setTime) {
            cuk.setTime();
        }

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

        if (cukData.setCukCode){
            cukData.setCukCode();
        }

        let newCUK = await prismaClient.cUK.create({
            data: cukData
        });

        if (newCUK === null) {
            console.error('Error creating CUK');
            return new Error('Error creating CUK');
        }

        return newCUK as ICUK;

    } catch (error: any) {
        console.error('Error creating CUK:', error);
        return error;
    }
}

export {
    create
};