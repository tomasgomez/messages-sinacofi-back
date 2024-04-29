import { NextApiRequest, NextApiResponse } from "next";

import  { get }  from '@/backend/handler/schema/getSchemaTypes';
import { get as getSchema } from "@/backend/handler/schema/getSchema";
import { APICalls } from '@/backend/entities/calls/calls';
import { Handler } from "@/backend/entities/calls/handler";

/*
Schema Handler
*/
class SchemaHandler extends Handler implements APICalls {
    
    // Get schema
    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => get(req, res);

    PUT = async (req: NextApiRequest, res: NextApiResponse < any > ) => getSchema(req, res);
   

}

// export calls
export const schemaCalls: APICalls = new SchemaHandler();