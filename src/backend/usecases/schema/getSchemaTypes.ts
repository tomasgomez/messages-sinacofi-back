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

    /* Set count and offset */
    let count = '5';
    let offset = '0';

    if (filter === undefined) {
      filter = {};
    }

    if (filter.count !== undefined && filter.count !== '') {
      count = filter.count;
    }

    if (filter.offset !== undefined && filter.offset !== '') {
      offset = filter.offset;
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

    schemas.map((schema: MessageSchema) => {
      if (schema.parameters === undefined) {
        return;
      } else if (schema.parameters.length === 0) {
        return;
      } else if (schema.parameters === null) {
        return;
      }

      if (schema.parameters) {
        schema.parameters.map((parameter: any) => {
        });
    }
  });

    return schemas;
  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}