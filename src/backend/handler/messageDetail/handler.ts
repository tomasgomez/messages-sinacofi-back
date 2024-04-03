import { NextApiRequest, NextApiResponse } from "next";
import { Handler } from "@/backend/entities/handler";

import { _get } from '@/backend/handler/messageDetail/get';
import { APICalls } from "@/backend/interfaces/calls";

/*
Mesasage Detail hanlder
*/
class MesasageDetailHandler extends Handler implements APICalls {
    // Get message
    async GET(req: NextApiRequest, res: NextApiResponse < any > ) {
       _get(req, res);
    }

}

// export Message detail calls
export const messageDetailCalls: APICalls = new MesasageDetailHandler();