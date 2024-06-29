import { NextApiRequest, NextApiResponse } from "next";
import { Handler } from "@/backend/entities/calls/handler";
import { APICalls } from "@/backend/entities/calls/calls";
import { get } from '@/backend/handler/informsAccepted/get';

/*
Mesasage Foreclosure hanlder
*/
class InformsAcceptedHandler extends Handler implements APICalls {
    // Get message
    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => get(req, res);

}

// export Message Foreclosure calls
export const informsAcceptedHandler: APICalls = new InformsAcceptedHandler();