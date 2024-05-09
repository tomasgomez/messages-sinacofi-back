import { PrismaClientWrapper } from '../prismaWrapper';
import { ICUK } from '@/backend/entities/cuk/interface';


export async function update(cuk: ICUK): Promise < ICUK | Error > {
    try {
        const prisma = new PrismaClientWrapper();

        const prismaClient = prisma.getClient();

        /* Filter out empty values from the cuk object */
        const dataToUpdate = Object.fromEntries(
            Object.entries(cuk).filter(([_, value]) => value !== '')
        );

        console.log('Data to update:', dataToUpdate);

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