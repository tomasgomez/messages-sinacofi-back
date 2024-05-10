
import { Filter } from "@/backend/entities/schema/filter";
import { MessageSchema } from "@/backend/entities/schema/messageSchema";

export interface SchemaUsecases {
    getSchemaTypes(filter: Filter): Promise<MessageSchema[] | Error>;
    getSchema(messageCode: string, cuk?: string): Promise < MessageSchema[] | Error >
}