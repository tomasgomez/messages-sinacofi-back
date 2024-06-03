import { FilterParameter } from "@/backend/entities/message/filter";
import { Parameter } from "@/backend/entities/message/parameter";
import { ParameterRepository } from "@/backend/repository/parameterRepository";


// Get messageDetail function
export async function getParameters(repository: ParameterRepository, filter: FilterParameter): Promise < Parameter[] | Error > {
    try {
        return await repository.find(filter);
    } catch (error: any) {

        console.error('Error fetching parameters:', error);
        return error;
    }
}