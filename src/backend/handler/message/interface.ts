import { NextApiRequest, NextApiResponse } from "next";

export interface MessageCalls {
    GET(req: NextApiRequest, res: NextApiResponse < any > ): Promise<void>,
    POST(req: NextApiRequest, res: NextApiResponse < any > ): Promise<void>,
    PUT(req: NextApiRequest, res: NextApiResponse < any > ): Promise<void>
}