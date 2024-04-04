import { NextApiRequest, NextApiResponse } from "next";

export async function put(req: NextApiRequest, res: NextApiResponse < any > ) {
    try {

        res.status(200).json("");
        return;

    } catch (error) {
        console.error('Error creating Area:', error);
        res.status(500).json(new Error('Internal server error'));
    }
}