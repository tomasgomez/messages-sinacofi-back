import { validateGetMessage } from "@/backend/presenter/message";
import { messageDetailUseCase } from "@/backend/usecases/messageDetail/usecases";
import { NextApiRequest, NextApiResponse } from "next";

export async function get(req: NextApiRequest, res: NextApiResponse < any > ){
    try {

        /* Validate the query params and get the Message */
        let result = validateGetMessage(req.query);

        if (result instanceof Error) {
          res.status(400).json(result);
          return;
        }

        let [message, count, offset] = result;

        /* Use the PrismaAreaAdapter to get the Message from the database */
        let messageResponse = await messageDetailUseCase.getMessageDetail(message, count, offset)

        /* If the message is not found, return a 404 error */
        if (!messageResponse) {
          res.status(404).json(new Error('message not found'));
          return;
        }

        /* Return the message */
        res.status(200).json(messageResponse);

      } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json(new Error('Internal server error'));
      }
}