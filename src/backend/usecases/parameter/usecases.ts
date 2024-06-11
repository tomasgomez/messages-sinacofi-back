import { Parameter } from "@/backend/entities/message/parameter";
import { ParameterUsecases } from "./interface";
import { FilterParameter } from "@/backend/entities/message/filter";
import { ParameterRepository } from "@/backend/repository/parameterRepository";
import { PrismaParameterAdapter } from "@/backend/repository/parameter/parameter";
import { getParameters } from "./methods/getParameters";


// Parameter usecase
export class ParameterUsecase implements ParameterUsecases {
    constructor(private readonly parameterRepository: ParameterRepository){}
    // get Schema detail
    getParameters = async (filter: FilterParameter): Promise < Parameter[] | Error > => await getParameters(this.parameterRepository,filter)

}
const parameterRepository: ParameterRepository = new PrismaParameterAdapter();
export const parameterUsecase = new ParameterUsecase(parameterRepository);


