import { FilterMessage } from "@/backend/entities/message/filter";

function findStatus (filter: FilterMessage): any {
    if (filter.status && filter.status.length > 0) {
        return {
            some: {
                id: {
                    in: filter.status,
                },
            },
        };
    }
}

export { findStatus };