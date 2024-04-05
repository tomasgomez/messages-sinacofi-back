import { messageUseCase } from "@/backend/usecases/message/usecases";
import { NextApiRequest, NextApiResponse } from "next";


// put message function
export async function put(req: NextApiRequest, res: NextApiResponse < any > ) {
    try {
        let messageResponse = await messageUseCase.updateMessage(req.body);
        res.status(200).json(req.body);
        return;

    } catch (error) {
        console.error('Error updating Message:', error);
        res.status(500).json(new Error('Internal server error'));
    }
}