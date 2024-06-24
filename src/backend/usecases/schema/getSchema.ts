import {
  MessageSchema
} from '@/backend/entities/schema/messageSchema';
import {
  getEnvVariable
} from '@/backend/utils/functions';
import {
  envVariables
} from '@/backend/utils/variables';
import {
  Filter
} from '@/backend/entities/schema/filter';
import { parameterUsecase } from '../parameter/usecases';
import { post } from '@/backend/adapters/rule/post';
import { User } from '@/backend/entities/user/user';

// Get message function
export async function getSchema(filter: Filter, user: User): Promise < MessageSchema | Error > {
  try {

    let url = getEnvVariable(envVariables.RULE_CLIENT_URL);
    if (url instanceof Error) {
      return url;
    }

    let path = getEnvVariable(envVariables.SCHEMA_PATH);
    if (path instanceof Error) {
      return path;
    }

    if (!filter.messageCode || filter.messageCode.length ==0 ){
      return new Error("no messageCode")
    }

    path = path+"/"+filter.messageCode[0]

    let parameters: any[] = [];
    // check if exists cukCode
    if (filter.cuk && filter.cuk != ''){
      const parametersResponse = await parameterUsecase.getParameters({cukCode: [filter.cuk]});
      if (!(parametersResponse instanceof Error)){
        parameters = parametersResponse;
      }
    }
    // detect if exist beneficiaryBank
    const beneficiaryBank = parameters.filter(parameter => parameter.name == 'beneficiaryBank');
    if ((!beneficiaryBank || beneficiaryBank.length == 0) && filter.destination && filter.destination.length>0){

      const dest = filter.destination[0]; 

      parameters.push(
        {"name": "beneficiaryBank", 
        "messageCode": filter.messageCode, 
        "priority": 0, 
        "rules": [], 
        "type": "select",
        "defaultValue": dest, 
        "value": dest,
        "optionValues": 'institution'})
    }

    console.log(parameters);
    let schemas = await post(url, path, {}, {
      user: user,
      parameters,
      actions: [filter.action]
    });

    return schemas;

  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}