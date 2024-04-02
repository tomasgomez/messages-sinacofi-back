import { NextApiRequest, NextApiResponse } from "next";

import { _get } from '@/backend/handler/messageDetail/get';
import { MessageDetailCalls } from '@/backend/handler/messageDetail/interface';

/*
MesasageHandler
*/
class MesasageHandler {
    
    // Get message
    async GET(req: NextApiRequest, res: NextApiResponse < any > ) {
       _get(req, res);
    }

}

export const messageCalls: MessageDetailCalls = new MesasageHandler();