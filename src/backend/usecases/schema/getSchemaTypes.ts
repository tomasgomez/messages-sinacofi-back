import {
  Filter
} from '../../entities/schema/filter';
import {
  MessageSchema
} from '../../entities/schema/messageSchema';
import {
  getEnvVariable
} from '../../utils/functions';
import {
  envVariables
} from '../../utils/variables';
import {
  get
} from "@/backend/adapters/rule/get";


// Get message function
export async function getSchemaTypes(filter: Filter): Promise < MessageSchema[] | Error > {
  try {

    if (filter === undefined) {
      filter = {};
    }

    /* Get Environment Variables */
    let url = getEnvVariable(envVariables.RULE_CLIENT_URL);
    if (url instanceof Error) {
      return url;
    }

    let path = getEnvVariable(envVariables.SCHEMA_TYPES_PATH);
    if (path instanceof Error) {
      return path;
    }

    /* If the messageCode is not empty, add it to the path */
    if (filter.messageCode !== undefined && filter.messageCode.length > 0) {
      path = `${path}?messageCode=${filter.messageCode.join(',')}`;
    }

    let schemas = await get(url, path, {},{})

    if (schemas instanceof Error) {
      throw schemas;
    }

    if (schemas.length === 0) {
      throw new Error('No message found');
    }

    schemas = schemas.map((schema: MessageSchema) => {
      if (!(schema.parameters === undefined || schema.parameters === null || schema.parameters.length === 0) && schema.parameters) {
        schema.parameters = schema.parameters.map((parameter: any) => {
          parameter.validations = parameter.rules.map((rule: any) => {
            return rule.validation;
          });
        });
    }
  });

    return schemas;
  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}