interface Meta {
    count: number;
    offset: number;
    filtered: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export class Paginated<T> {
    data: T[]
    meta: Meta;
    constructor(data: T[], count: number, offset: number, filtered: number) {
        this.data = data;
        this.meta = {
            count: count,
            offset: offset,
            filtered: filtered,
            currentPage: Math.floor(offset / count) + 1,
            totalPages: Math.ceil(filtered / count),
            hasNextPage: offset + count < filtered,
            hasPrevPage: offset > 0
        }
    }

    static fromPrimitives<T>(data: T[], count: number, offset: number, filtered: number): Paginated<T> {
        return new Paginated<T>(data, count, offset, filtered);
    }

    toPrimitives(): any {
        return {
            data: this.data,
            meta: this.meta
        }
    }
}