import { NextApiRequest, NextApiResponse } from "next";
import { Handler } from "@/backend/entities/calls/handler";

import { get } from '@/backend/handler/foreclosureAccepted/get';
import { APICalls } from "@/backend/entities/calls/calls";

/*
Mesasage Foreclosure hanlder
*/
class ForeclouseAcceptedHandler extends Handler implements APICalls {
    // Get message
    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => get(req, res);

}

// export Message Foreclosure calls
export const foreclouseAcceptedHandler: APICalls = new ForeclouseAcceptedHandler();