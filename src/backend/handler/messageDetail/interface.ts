import { NextApiRequest, NextApiResponse } from "next";

export interface MessageDetailCalls {
    GET(req: NextApiRequest, res: NextApiResponse < any > ): Promise<void>
}