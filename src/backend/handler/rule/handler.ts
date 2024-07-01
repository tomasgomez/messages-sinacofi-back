import { NextApiRequest, NextApiResponse } from "next";
import { get as getRule } from "@/backend/handler/rule/getSchedule";
import { APICalls } from '@/backend/entities/calls/calls';
import { Handler } from "@/backend/entities/calls/handler";

/*
Rule Handler
*/
class RuleHandler extends Handler implements APICalls {
    
    // Get Rule
    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => getRule(req, res);

}

// export calls
export const ruleCalls: APICalls = new RuleHandler();