import { MessageRepository } from '@/backend/repository/messageRepository';
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


import { PrismaMessageAdapter as PrismaAdapter } from '../../repository/message/message';
import { Message } from '@/backend/entities/message/message';

const messageRepository: MessageRepository = new PrismaAdapter();

// Get message function
export async function getSchema(messageCode: string, cuk?: string): Promise < MessageSchema[] | Error > {
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


    let schemas = await get(url, path, {},{})
    const messageAH = ["671", "672", "673"].find((element) => element === messageCode); // TODO: Sacar ultimo por 670
    if (messageAH && cuk) {
      let message = new Message();
      message.messageCode = "670";
      message.cukCode = cuk;
      let response = await messageRepository.find(message, true, "0","0");
      if (response instanceof Error) {
        return response;
      }
      const schemaUpdated = schemas.parameters.map((schema: any) => {
        const params = response[0].parameters?.find((param:any) => param.name === schema.name);
        if (params && params.name != 'messageDescription' && params.name != 'messageCode' && params.type != "label") {
          const value = params.value;
          schema.defaultValue = value;
        }
        
        schema.value = params?.value;

        if (schema && schema.name == 'CUK'){
          console.log("cuk", cuk);
          schema.defaultValue = cuk;
        }

        return schema;
        
      });

      schemas.paremeters = schemaUpdated; 
          
    }

    return schemas;
  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}