
import { Filter } from "@/backend/entities/cuk/filter";
import { CUK } from "@/backend/entities/cuk/cuk";
import { Paginated } from "@/backend/entities/pagination/Paginated";

export interface CukInformsUseCases {
    getInformsRejected(filter: Filter): Promise<Paginated<CUK> | Error>;
    getInformsAccepted(filter: Filter): Promise<Paginated<CUK> | Error>;
}