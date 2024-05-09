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


    console.log('path', path);
    console.log('url', url);


    let schemas = await get(url, path, {},{})

    const messageAH = ["671", "672", "673"].find((element) => element === messageCode);
    console.log("messageAH", messageAH);
    if (messageAH && cuk) {
      console.log("messageAH", messageAH);
      let message = new Message();
      message.messageCode = messageCode;
      message.cukCode = cuk;
      let response = await messageRepository.find(message, true, "0","0");
      if (response instanceof Error) {
        return response;
      }

      console.log("response", response[0]);
      console.log("---");
      console.log("response", schemas);


    
    }

    return schemas;
  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}