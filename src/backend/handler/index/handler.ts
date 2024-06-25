import { NextApiRequest, NextApiResponse } from "next";
import { Handler } from "@/backend/entities/calls/handler";
import { APICalls } from "@/backend/entities/calls/calls";
import { get } from "./get";


/*
Index handler
*/
class IndexHandler extends Handler implements APICalls {
    // Get documents
    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => get(req, res);
}

// export index calls
export const indexCalls: APICalls = new IndexHandler();