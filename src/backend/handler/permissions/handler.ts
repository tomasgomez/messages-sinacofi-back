import { NextApiRequest, NextApiResponse } from "next";

import  { get }  from '@/backend/handler/permissions/get';

import { APICalls } from '@/backend/entities/calls/calls';
import { Handler } from "@/backend/entities/calls/handler";

/*
Permission Handler
*/
class PermissionHandler extends Handler implements APICalls {
    // Get message
    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => get(req, res);
}

// export calls
export const PermissionCalls: APICalls = new PermissionHandler();