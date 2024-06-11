import { FilterParameter } from "../entities/message/filter";
import { Parameter } from "@/backend/entities/message/parameter";

  export interface ParameterRepository {
      find(filter: FilterParameter): Promise < Parameter[] | Error >
  }
  