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
export async function getSchema(messageCode: string): Promise < MessageSchema[] | Error > {
  try {

    let url = getEnvVariable(envVariables.RULE_CLIENT_URL);
    if (url instanceof Error) {
      return url;
    }

    let path = getEnvVariable(envVariables.SCHEMA_PATH);
    if (path instanceof Error) {
      return path;
    }

    path = `${path}/${messageCode}`;

    console.log('path', path);
    console.log('url', url);


    let schemas = await get(url, path, {},{})

    return schemas;
  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}