import { FilterParameter } from "@/backend/entities/message/filter";
import { Parameter } from "@/backend/entities/message/parameter";
import { PrismaClientWrapper } from "../prismaWrapper";
import { Parameters } from "@prisma/client";



async function find(filter: FilterParameter): Promise<Parameter[] | Error> {

    try {
        const prisma = new PrismaClientWrapper();
        const client = prisma.getClient();

        const parameters = await client.parameters.findMany({
            where: {
                cukCode: {
                    in: filter.cukCode
                }
            }
        })

        if (parameters.length == 0){
            return new Error("parameter not found")
        }

        const response: Parameter[] = parameters.map( (param: Parameters) => {
            return {
                name: param.name,
                messageCode: param.messageCode,
                value: param.value,
                priority: param.priority
            }
        })

        return response;

    } catch(error: any){
        console.log("Error fetching parameters: ", error);
        return error;
    }
}

export { find };
