import { Message } from "@/backend/entities/message/message";
import { PrismaClientWrapper } from '../prismaWrapper';
import { MessageFilter } from "@/backend/entities/message/filter";
import { CUK } from "@/backend/entities/cuk/cuk";

async function findBy(filter: MessageFilter): Promise<CUK[] | Error> {
    try {
        let messages: Message[] = [];
        let cuks: CUK[] = [];

        const prisma = new PrismaClientWrapper();
        const prismaClient = prisma.getClient();
        

        // Find the 5 newest CUKs
        cuks = await prismaClient.cUK.findMany({
            orderBy: { creationDate: 'desc' },
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
            cukNew.name = cuk.name;
            cukNew.description = cuk.description;
            cukNew.creationDate = cuk.creationDate;
            cukNew.cukCode = cuk.cukCode;
            cukNew.issuedDate = cuk.issuedDate;
            cukNew.channel = cuk.channel;
            cukNew.status = cuk.status;
            cukNew.buyer = cuk.buyer;
            cukNew.buyerDni = cuk.buyerDni;
            cukNew.owner = cuk.owner;
            cukNew.ownerDni = cuk.ownerDni;
            cukNew.borrower = cuk.borrower;
            cukNew.borrowerDni = cuk.borrowerDni;
            cukNew.region = cuk.region;
            cukNew.institutionCode = cuk.institutionCode;
            cukNew.institutionDestination = cuk.institutionDestination;

            const messagesForCUK = await prismaClient.message.findMany({
                where: { cukCode: cukNew.cukCode },
                select: {
                    id: true,
                    TSN: true,
                    OSN: true,
                    NSE: true,
                    messageCode: true,
                    description: true,
                    priority: true,
                    status: true,
                    sender: true,
                    creationDate: true,
                    creationTime: true,
                    receiver: true,
                    receivedDate: true,
                    receivedTime: true,
                    actions: true,
                    documents: true,
                }
            });

            if (cukNew.addMessage){
                cukNew.addMessage(messagesForCUK);
            }
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
