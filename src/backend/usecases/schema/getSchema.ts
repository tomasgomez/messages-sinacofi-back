import {
  MessageRepository
} from '@/backend/repository/messageRepository';
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
  get
} from "@/backend/adapters/rule/get";
import {
  FilterMessage
} from '@/backend/entities/message/filter';
import {
  PrismaMessageAdapter as PrismaAdapter
} from '../../repository/message/message';
import {
  Message
} from '@/backend/entities/message/message';
import {
  Filter
} from '@/backend/entities/schema/filter';
import { Parameter } from '@/backend/entities/message/parameter';

const messageRepository: MessageRepository = new PrismaAdapter();

// Get message function
export async function getSchema(filter: Filter): Promise < MessageSchema[] | Error > {
  try {

    let url = getEnvVariable(envVariables.RULE_CLIENT_URL);
    if (url instanceof Error) {
      return url;
    }

    let path = getEnvVariable(envVariables.SCHEMA_PATH);
    if (path instanceof Error) {
      return path;
    }

    if (filter.messageCode)
      path = `${path}/${filter.messageCode}`;

    let schemas = await get(url, path, {}, {})

    
    if (!filter.messageCode?.includes('670') && filter.messageId && filter.messageId.length>0) {

      let filterMessage: FilterMessage = {
          id: filter.messageId,
          detail: false,
        };

      let message = await messageRepository.find(filterMessage);

      if (message instanceof Error) {
        return message;
      }

      if (!message || message.length === 0) {
        return schemas;
      }

      // get message 670
      const cuk = message.map(msg => msg.cukCode ?? '').filter(c => c != '');
      
      filterMessage = {
        cukCode: cuk,
        messageCode: ["670"],
        detail: true
      }

      let message670 = await messageRepository.find(filterMessage);

      if (message670 instanceof Error) {
        return message670;
      }

      if (!message670 || message.length === 0) {
        return schemas;
      }


      schemas.parameters = adaptSchema(schemas.parameters, message670[0]);
    }
 
    return schemas;
  } catch (error: any) {
    console.error('Error updating message:', error);
    return error;
  }
}

function adaptSchema(parameters: Parameter[], message: Message): Parameter[] {
  return parameters.map((schema: any) => {

    // split schema name with _ and get the first one
    let name = schema.name.split('_')[0];

    let params = message.parameters?.find((param: any) => param.name === name);
    
    schema.value = params?.value;

    if (params && params.name != 'messageDescription' && params.name != 'messageCode' && params.type != "label") {
      let value = params.value;
      schema.defaultValue = value;
    }

    if (schema && schema.type == 'select') {
      let selected = schema.optionValues.find((option: any) => option.label === params?.value);
      if (selected) {
        schema.defaultValue = selected.value;
      }
    }

    if (schema && schema.name == 'CUK') {
      schema.defaultValue = message.cukCode;
      schema.value = message.cukCode;
    }

    if (schema && schema.defaultValue == '') {
      let rules = schema.rules.filter((rule: any) => rule.name !== 'disabled');
      schema.rules = rules;
    }

    return schema;

  });
}