import { Filter } from '../../entities/schema/filter';
import { SchemaUsecases } from "./interface";
import { getSchemaTypes } from './getSchemaTypes';
import { MessageSchema } from '../../entities/schema/messageSchema';
import { getSchema } from './getSchema';

// Schema Detail usecases
export class SchemaUsecase implements SchemaUsecases {

    // get Schema detail
    getSchemaTypes = async (filter: Filter): Promise<MessageSchema[] | Error> =>
        getSchemaTypes(filter)

    // get Schema
    getSchema = async (filter: Filter): Promise<MessageSchema[] | Error> => 
        getSchema(filter)

}

export const schemaUseCase = new SchemaUsecase();


