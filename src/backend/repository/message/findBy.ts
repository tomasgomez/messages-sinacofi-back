import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';
import { FilterMessage } from "@/backend/entities/message/filter";
import { CUK } from "@/backend/entities/cuk/cuk";

async function findBy(filter: FilterMessage): Promise<CUK[] | Error> {
    try {
        let messages: Message[] = [];
        let cuks: CUK[] = [];

        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();
        

        // Find the 5 newest CUKs
        cuks = await prismaClient.cUK.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5
        });

        // If no CUKs are found, return an error
        if (cuks.length === 0) {
            return new Error('No CUKs found');
        }

        // Retrieve messages for each CUK
        for (const cuk of cuks) {
            let cukNew = new CUK();

            cukNew.id = cuk.id;
            cukNew.creationDate = cuk.creationDate;
            cukNew.cukCode = cuk.cukCode;

            const messagesForCUK = await prismaClient.message.findMany({
                where: { cukCode: cukNew.cukCode },
                select: {
                    id: true,
                    TSN: true,
                    OSN: true,
                    NSE: true,
                    messageCode: true,
                    creationDate: true,
                    creationTime: true,
                    receivedDate: true,
                    receivedTime: true,
                    actions: true,
                    documents: true,
                }
            });
        }

        // If no messages are found, return an error
        if (messages.length === 0) {
            return new Error('No messages found for the specified CUKs');
        }

        return cuks;

    } catch (error: any) {
        console.error('Error fetching messages:', error);
        return error;
    }
}

export { findBy };
