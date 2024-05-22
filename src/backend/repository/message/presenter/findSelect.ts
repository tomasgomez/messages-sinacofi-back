import {
    FilterMessage
} from '@/backend/entities/message/filter';

function findSelect(filter: FilterMessage): any {
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
        TSN: true,
        LSN: true,
        OSN: true,
        NSE: true,
        NSR: true,
        NSQ: true
    };
    
    // Always include 'detail' related properties
    select.documents = filter.detail;
    select.parameters = filter.detail;

    return select;
}

export {
    findSelect
};
