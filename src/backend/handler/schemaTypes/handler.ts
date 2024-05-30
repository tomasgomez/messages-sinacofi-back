import { NextApiRequest, NextApiResponse } from "next";

import  { getSchemaTypes }  from '@/backend/handler/schemaTypes/getSchemaTypes';
import { APICalls } from '@/backend/entities/calls/calls';
import { Handler } from "@/backend/entities/calls/handler";

/*
Schema Handler
*/
class SchemaHandler extends Handler implements APICalls {

    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => getSchemaTypes(req, res);

}

// export calls
export const schemaCalls: APICalls = new SchemaHandler();