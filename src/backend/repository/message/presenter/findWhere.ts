import { FilterMessage } from "@/backend/entities/message/filter";
import { Message } from "@/backend/entities/message/message";

function findWhere (filter: FilterMessage): Partial<Message> {
    // Initialize the where object with the provided attributes to search with
    const where: Partial<Message> = {};

    // Loop through the provided attributes and add them to the where object
    for (const key in filter) {
        if (Object.hasOwn(where, key)) {
            const value = filter[key as keyof FilterMessage];
            if (value !== undefined) {
                where[key as keyof Message] = value as any;
            }
        }
    }

    return where;
}

export { findWhere };