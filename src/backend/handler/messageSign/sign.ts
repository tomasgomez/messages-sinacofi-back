import { messageUseCase } from "@/backend/usecases/message/usecases";
import { validateUpdateMessage } from "@/backend/handler/messageSign/presenter/updateMessage";
import { NextApiRequest, NextApiResponse } from "next";
import { prepareMessages } from "./adapter/prepareMessages";

// put message function
export async function sign(req: NextApiRequest, res: NextApiResponse < any > ) {
    try {
        let message = validateUpdateMessage(req.body);

        if (message instanceof Error) {
            res.status(400).json(message);
            return;
        }
        let messageResponse = await messageUseCase.signMessage(message);

        if (messageResponse instanceof Error) {
            res.status(400).json(messageResponse);
            return;
        }
        let messages = prepareMessages([messageResponse]);

        if (messages instanceof Error) {
            res.status(400).json(messages);
            return;
        } else if (messages.length === 0) {
            res.status(400).json(new Error('No message returned'));
            return;
        }

        res.status(200).json(messages[0]);
        return;

    } catch (error) {
        console.error('Error updating Message:', error);
        res.status(500).json(new Error('Internal server error'));
    }
}