import { validateGetMessage } from "@/backend/handler/message/presenter/getMessage";
import { messageUseCase } from "@/backend/usecases/message/usecases";
import { NextApiRequest, NextApiResponse } from "next";


// get message function
export async function get(req: NextApiRequest, res: NextApiResponse < any > ){
    try {

        /* Validate the query params and get the Message */
        let result = validateGetMessage(req.query);

        if (result instanceof Error) {
          res.status(400).json([]);
          return;
        }

        let [message, count, offset] = result;

        /* Use the PrismaAreaAdapter to get the Message from the database */
        let messageResponse = await messageUseCase.getMessage(message, count, offset)

        /* If the message is not found, return a 204 error */
        if (messageResponse instanceof Error) {
          res.status(204).json([]);
          return;
        }

        /* Return the message */
        res.status(200).json(messageResponse);
        return;

      } catch (error) {

        console.error('Error fetching message:', error);
        res.status(500).json(new Error('Internal server error'));
        return;
      }
}