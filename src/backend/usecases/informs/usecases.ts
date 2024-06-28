import { CUKRepository } from "@/backend/repository/cukRepository";
import { PrismaCukAdapter as PrismaCukAdapter } from '../../repository/cuk/cuk';
import { Filter } from '../../entities/cuk/filter';
import { CUK } from '../../entities/cuk/cuk';
import { getInformsRejected } from "./getInformsRejected";
import { getInformsAccepted } from "./getInformsAccepted";
import { CukInformsUseCases } from "./interface";
import { Paginated } from "@/backend/entities/pagination/Paginated";

export class CukInformsUseCase implements CukInformsUseCases {
    constructor(
      private readonly cukRepository: CUKRepository
    ) {}

    getInformsAccepted = async (filter: Filter): Promise<Paginated<CUK> | Error> =>
        getInformsAccepted(this.cukRepository, filter)

    getInformsRejected = async (filter: Filter): Promise<Paginated<CUK> | Error> =>
        getInformsRejected( this.cukRepository, filter)
}

const cukRepository: CUKRepository = new PrismaCukAdapter();

export const cukInformsUseCase = new CukInformsUseCase(cukRepository);


