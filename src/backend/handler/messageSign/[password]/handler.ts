import { NextApiRequest, NextApiResponse } from "next";
import { APICalls } from '@/backend/entities/calls/calls';
import { Handler } from "@/backend/entities/calls/handler";
import { validate } from "./validate";

type GetRequest = NextApiRequest & {
    query:{
      password: string
    }
  }
/*
Mesasage Handler
*/
class MesageSignHandler extends Handler implements APICalls {
    
    // Put message
    GET = async (req: GetRequest, res: NextApiResponse < any > ) => validate(req, res);
}

// export calls
export const messageCalls: APICalls = new MesageSignHandler();