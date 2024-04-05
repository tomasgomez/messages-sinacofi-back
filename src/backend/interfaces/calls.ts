import { NextApiRequest, NextApiResponse } from "next";

export interface APICalls {
    GET(req: NextApiRequest, res: NextApiResponse < any > ): Promise<any>,
    POST(req: NextApiRequest, res: NextApiResponse < any > ): Promise<any>,
    PUT(req: NextApiRequest, res: NextApiResponse < any > ): Promise<any>
    DELETE(req: NextApiRequest, res: NextApiResponse < any > ): Promise<any>
}