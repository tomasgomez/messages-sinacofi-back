import {
    PrismaClientWrapper
} from '../prismaWrapper';
import {
    CUK
} from '@/backend/entities/cuk/cuk';

async function create(cuk: CUK): Promise < CUK | Error > {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        let cukData: Partial<CUK> = {};

        /* Add all the attributes to the new CUK */
        if (Object.keys(cuk).length > 0) {
            for (const [key, value] of Object.entries(cuk)) {
                if (value !== undefined && key in cuk) {
                    cukData[key as keyof CUK] = value;
                }
            }
        }

        let newCUK = await prismaClient.cUK.create({
            data: {
                ...cukData,
                history: {},
                parameters: {},
                messages: {}
            },
            include: {
                history: true,
                messages: true
            }
        });

        return newCUK;

    } catch (error: any) {
        console.error('Error creating CUK:', error);
        return error;
    }
}

export {
    create
};