import {
    FilterMessage
} from '@/backend/entities/message/filter';

function findSelect(parameters: boolean=false, documents:boolean=false): any {
    const select: any = {
        id: true,
        messageCode: true,
        origin: true,
        destination: true,
        originArea: true,
        destinationArea: true,
        creationDate: true,
        creationTime: true,
        receivedDate: true,
        receivedTime: true,
        actions: true,
        createdAt: true,
        updatedAt: true,
        cukCode: true,
        status: true,
        TSN: true,
        LSN: true,
        OSN: true,
        NSE: true,
        NSR: true,
        NSQ: true,
    };
    
    // Always include 'detail' related properties
    select.documents = documents;
    select.parameters = parameters;

    return select;
}

export {
    findSelect
};
