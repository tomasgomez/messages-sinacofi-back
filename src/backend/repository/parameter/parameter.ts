import { Parameter } from "@/backend/entities/message/parameter";
import { ParameterRepository } from "../parameterRepository";
import { FilterParameter } from "@/backend/entities/message/filter";
import { find } from "./find";

export class PrismaParameterAdapter implements ParameterRepository {
  // find message
  find = async(filter: FilterParameter): Promise<Parameter[] | Error> => await find(filter);
  }

