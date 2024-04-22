import { messageUseCase } from "@/backend/usecases/message/usecases";
import { validateCreateMessage } from "@/backend/presenter/message/createMessage";
import { NextApiRequest, NextApiResponse } from "next";

// post message function
export async function post(req: NextApiRequest, res: NextApiResponse < any > ) {
    try {
        let validatedMessage = await validateCreateMessage(req.body);

        if (validatedMessage instanceof Error) {
            res.status(400).json(validatedMessage.message);
            return;
        }

        let messageResponse = await messageUseCase.createMessage(validatedMessage);
        res.status(201).json(messageResponse);
        return;
      } catch (error: any) {
        console.error('Error creating Message:', error);
        res.status(500).json(new Error('Internal server error'));
    }
}