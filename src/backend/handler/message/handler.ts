import { NextApiRequest, NextApiResponse } from "next";

import { _get } from '@/backend/handler/message/get';
import { _post } from '@/backend/handler/message/post';
import { _put } from '@/backend/handler/message/put';
import { MessageCalls } from '@/backend/handler/message/interface';

/*
MesasageHandler
*/
class MesasageHandler implements MessageCalls {
    
    // Get message
    async GET(req: NextApiRequest, res: NextApiResponse < any > ) {
       _get(req, res);
    }

    // Post message
    async POST(req: NextApiRequest, res: NextApiResponse < any > ) {
        _post(req, res);
    }

    // Put message
    async PUT(req: NextApiRequest, res: NextApiResponse < any > ) {
        _put(req, res);
    }

}

export const messageCalls: MessageCalls = new MesasageHandler();