import { NextApiRequest, NextApiResponse } from "next";

import { _get } from '@/backend/handler/message/get';
import { _post } from '@/backend/handler/message/post';
import { _put } from '@/backend/handler/message/put';
import { APICalls } from '@/backend/interfaces/calls';
import { Handler } from "@/backend/entities/handler";

/*
Mesasage Handler
*/
class MesasageHandler extends Handler implements APICalls {
    
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

// export calls
export const messageCalls: APICalls = new MesasageHandler();