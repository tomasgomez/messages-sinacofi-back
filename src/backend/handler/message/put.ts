import { messageUseCase } from "@/backend/usecases/message/usecases";
import { validateUpdateMessage } from "@/backend/presenter/message";
import { NextApiRequest, NextApiResponse } from "next";


// put message function
export async function put(req: NextApiRequest, res: NextApiResponse < any > ) {
    try {

        let message = validateUpdateMessage(req.body);

        if (message instanceof Error) {
            res.status(400).json(message);
            return;
        }

        let messageResponse = await messageUseCase.updateMessage(message);
        res.status(200).json(messageResponse);
        return;

    } catch (error) {
        console.error('Error updating Message:', error);
        res.status(500).json(new Error('Internal server error'));
    }
}