import { messageUseCase } from "@/backend/usecases/message/usecases";
import { validateCreateMessage } from "@/backend/handler/message/presenter/createMessage";
import { NextApiRequest, NextApiResponse } from "next";
import { prepareMessages } from "./adapter/prepareMessages";

// post message function
export async function post(req: NextApiRequest, res: NextApiResponse < any > ) {
    try {
        let validatedMessage = await validateCreateMessage(req.body);

        if (validatedMessage instanceof Error) {
            res.status(400).json(validatedMessage.message);
            return;
        }

        let messageResponse = await messageUseCase.handleMessage(validatedMessage);

        if (messageResponse instanceof Error) {
            res.status(400).json(messageResponse.message);
            return;
        }

        let preparedMessage = await prepareMessages([messageResponse]);

        if (preparedMessage instanceof Error) {
            res.status(400).json(preparedMessage.message);
            return;
        } else if (preparedMessage.length === 0) {
            res.status(400).json(new Error('No message returned'));
            return;
        }
        
        res.status(201).json(preparedMessage[0]);
        return;
      } catch (error: any) {
        console.error('Error creating Message:', error);
        res.status(500).json(new Error('Internal server error'));
    }
}