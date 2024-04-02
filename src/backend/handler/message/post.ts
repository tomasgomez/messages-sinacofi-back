import { NextApiRequest, NextApiResponse } from "next";

export async function _post(req: NextApiRequest, res: NextApiResponse < any > ) {
    try {

        res.status(201).json("");
        return;
      } catch (error: any) {
        console.error('Error creating Area:', error);
        res.status(500).json(new Error('Internal server error'));
    }
}