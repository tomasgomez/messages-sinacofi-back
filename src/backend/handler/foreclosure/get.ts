import { validateGetMessageForeclosure } from "@/backend/handler/foreclosure/presenter/getMessage";
import { messageForeclosureUseCase } from "@/backend/usecases/messageForeclosure/usecases";
import { NextApiRequest, NextApiResponse } from "next";

export async function get(req: NextApiRequest, res: NextApiResponse < any >, detail: boolean = false){
    try {

        /* Validate the query params and get the Message */
        let filter = validateGetMessageForeclosure(req.query);

        if (filter instanceof Error) {
          res.status(400).json([]);
          return;
        }

        /* Use the PrismaAreaAdapter to get the Message from the database */
        let messageResponse = await messageForeclosureUseCase.getMessageForeclosure(filter)

        /* If the message is not found, return a 204 error */
        if (!messageResponse) {
          res.status(204).json([]);
          return;
        }

        if (messageResponse instanceof Error) {
          res.status(500).json([]);
          return;
        }

        /* Return the message */
        res.status(200).json(messageResponse);

      } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json(new Error('Internal server error'));
      }
}
