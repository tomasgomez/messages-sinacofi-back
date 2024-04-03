import { NextApiRequest, NextApiResponse } from "next";

export interface APICalls {
    GET(req: NextApiRequest, res: NextApiResponse < any > ): Promise<void>,
    POST(req: NextApiRequest, res: NextApiResponse < any > ): Promise<void>,
    PUT(req: NextApiRequest, res: NextApiResponse < any > ): Promise<void>
    DELETE(req: NextApiRequest, res: NextApiResponse < any > ): Promise<void>
}