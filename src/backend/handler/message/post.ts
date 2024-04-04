import { messageUseCase } from "@/backend/usecases/message/usecases";
import { NextApiRequest, NextApiResponse } from "next";

// post message function
export async function post(req: NextApiRequest, res: NextApiResponse < any > ) {
    try {
        let messageResponse = await messageUseCase.createMessage(req.body);
        res.status(201).json("");
        return;
      } catch (error: any) {
        console.error('Error creating Message:', error);
        res.status(500).json(new Error('Internal server error'));
    }
}