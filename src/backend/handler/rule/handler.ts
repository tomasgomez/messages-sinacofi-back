import { NextApiRequest, NextApiResponse } from "next";

import  { getSchemaTypes }  from '@/backend/handler/rule/get';
import  { post }   from '@/backend/handler/message/post';
import  { put }  from '@/backend/handler/message/put';
import { APICalls } from '@/backend/entities/calls/calls';
import { Handler } from "@/backend/entities/calls/handler";
import { InternalError } from "@/backend/entities/internalError/error";

/*
Institution Handler
*/
class RuleHandler extends Handler implements APICalls {
    
    // Get message
    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => {
        let response = await getSchemaTypes(req.headers, req.body)

        if (response instanceof InternalError && response.statusCode !== undefined) {
            return res.status(response.statusCode).json(response);
        } else if (response instanceof Error) {
            return res.status(500).json(response);
        }
        
        res.status(200).json(response);
    };
    // Post message
    POST = async (req: NextApiRequest, res: NextApiResponse < any > ) => post(req, res);
    // Put message
    PUT = async (req: NextApiRequest, res: NextApiResponse < any > ) => put(req, res);

}

// export calls
export const ruleCalls: APICalls = new RuleHandler();