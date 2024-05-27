import { NextApiRequest, NextApiResponse } from "next";
import { Handler } from "@/backend/entities/calls/handler";
import { APICalls } from "@/backend/entities/calls/calls";
import { get } from "./get";

/*
Auth hanlder
*/
class auhtHandler extends Handler implements APICalls {
    // Auth
    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => get(req, res);
}

// export Auth calls
export const auhHandlerCalls: APICalls = new auhtHandler();
