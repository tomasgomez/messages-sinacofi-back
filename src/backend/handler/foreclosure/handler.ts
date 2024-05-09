import { NextApiRequest, NextApiResponse } from "next";
import { Handler } from "@/backend/entities/calls/handler";

import { get } from '@/backend/handler/foreclosure/get';
import { APICalls } from "@/backend/entities/calls/calls";

/*
Mesasage Foreclosure hanlder
*/
class MesasageForeclosureHandler extends Handler implements APICalls {
    // Get message
    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => get(req, res);

    // Put message
    PUT = async (req: NextApiRequest, res: NextApiResponse < any > ) => {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// export Message Foreclosure calls
export const messageForeclosureCalls: APICalls = new MesasageForeclosureHandler();