
function createInclude(): any {
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

    return select;
}

export {
    createInclude
};
