import { NextApiRequest, NextApiResponse } from "next";
import { Handler } from "@/backend/entities/calls/handler";
import { APICalls } from "@/backend/entities/calls/calls";
import { get } from "./get";

/*
Documents handler
*/
class DocumentsHandler extends Handler implements APICalls {
    // Get documents
    GET = async (req: NextApiRequest, res: NextApiResponse < any > ) => get(req, res);
}

// export documents calls
export const documentsCalls: APICalls = new DocumentsHandler();