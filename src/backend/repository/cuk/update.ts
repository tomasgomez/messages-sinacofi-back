import { PrismaClientWrapper } from '../prismaWrapper';
import { CUK } from '@/backend/entities/cuk/cuk';


export async function update(cuk: CUK): Promise < CUK | Error > {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        /* Filter out empty values from the cuk object */
        const dataToUpdate = Object.fromEntries(
            Object.entries(cuk).filter(([_, value]) => value !== '')
        );

        /* Update the cuk */
        let updatedCuk = await prismaClient.cUK.update({
            where: {
                id: cuk.id
            },
            data: dataToUpdate,
        });

        return updatedCuk;
    } catch (error: any) {
        console.error('Error updating cuk:', error);
        return error;
    }
}