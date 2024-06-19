import { NextApiRequest, NextApiResponse } from "next";

import  { sign }  from '@/backend/handler/messageSign/sign';
import { APICalls } from '@/backend/entities/calls/calls';
import { Handler } from "@/backend/entities/calls/handler";

/*
Mesasage Handler
*/
class MessageHandler extends Handler implements APICalls {
    
    // Put message
    PUT = async (req: NextApiRequest, res: NextApiResponse < any > ) => sign(req, res);  
}

// export calls
export const messageCalls: APICalls = new MessageHandler();