import { NextApiRequest, NextApiResponse } from "next";
import { Handler } from "@/backend/entities/calls/handler";

import { get } from '@/backend/handler/messageDetail/get';
import { APICalls } from "@/backend/entities/calls/calls";

/*
Mesasage Detail hanlder
*/
class MesasageDetailHandler extends Handler implements APICalls {
    // Get message
    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => get(req, res);

}

// export Message detail calls
export const messageDetailCalls: APICalls = new MesasageDetailHandler();