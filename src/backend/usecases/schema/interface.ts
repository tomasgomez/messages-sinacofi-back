
import { Filter } from "@/backend/entities/schema/filter";
import { MessageSchema } from "@/backend/entities/schema/messageSchema";
import { User } from "@/backend/entities/user/user";

export interface SchemaUsecases {
    getSchemaTypes(filter: Filter): Promise<MessageSchema[] | Error>;
    getSchema(filter: Filter, user: User): Promise < MessageSchema | Error >
}