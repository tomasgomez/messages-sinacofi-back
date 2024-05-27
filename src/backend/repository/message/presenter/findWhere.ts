import {
    FilterMessage
} from "@/backend/entities/message/filter";
import {
    Message
} from "@/backend/entities/message/message";

function findWhere(filter: FilterMessage): Partial < Message > {
    // Initialize the where object with the provided attributes to search with
    const where: Partial < Message > = {};

    // Loop through the provided attributes and add them to the where object
    for (const key in filter) {
        if (key === 'status') {
            continue;
        }

        const value = filter[key as keyof FilterMessage];

        if (value && value !== undefined && value !== null && value instanceof Array && value.length > 0) {
            where[key as keyof Message] = {
                in: value,
            };
        } else if (value && value !== undefined && value !== null && !(value instanceof Array)) {
            where[key as keyof Message] = value;
        }
    }

    delete where.detail;

    return where;
}

export {
    findWhere
};