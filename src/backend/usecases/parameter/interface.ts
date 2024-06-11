
import { FilterParameter } from "@/backend/entities/message/filter";
import { Parameter } from "@/backend/entities/message/parameter";


export interface ParameterUsecases {
    getParameters(filter: FilterParameter): Promise < Parameter[] | Error >
}