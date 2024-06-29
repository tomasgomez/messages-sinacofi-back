import { Parameter } from "@/backend/entities/message/parameter";

export const filterParam = (parameters: Parameter[], name: string):Parameter|undefined => {
  return parameters && parameters.length ? parameters.find((parameter) => parameter.name === name) : undefined;
}