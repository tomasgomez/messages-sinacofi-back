import { NextApiRequest, NextApiResponse } from "next";

import  { get }  from '@/backend/handler/message/get';
import  { post }   from '@/backend/handler/message/post';
import  { put }  from '@/backend/handler/message/put';
import { APICalls } from '@/backend/interfaces/calls';
import { Handler } from "@/backend/entities/handler";

/*
Institution Handler
*/
class InstitutionHandler extends Handler implements APICalls {
    
    // Get message
    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => get(req, res);
    // Post message
    POST = async (req: NextApiRequest, res: NextApiResponse < any > ) => post(req, res);
    // Put message
    PUT = async (req: NextApiRequest, res: NextApiResponse < any > ) => put(req, res);

}

// export calls
export const messageCalls: APICalls = new InstitutionHandler();