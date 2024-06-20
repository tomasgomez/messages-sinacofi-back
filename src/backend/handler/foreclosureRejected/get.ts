import { messageForeclosureUseCase } from "@/backend/usecases/foreclosure/usecases";
import { NextApiRequest, NextApiResponse } from "next";
import { prepareForclosure } from "./adapter/prepareForeclosureRejected";
import { validateFilterForeclosureRejected } from "./presenter/validateFilters";

export async function get(req: NextApiRequest, res: NextApiResponse < any >){
    try {
        /* Validate the query params and get the Message */
        let filter = validateFilterForeclosureRejected(req.query);

        if (filter instanceof Error) {
          res.status(400).json([]);
          return;
        }
        
        /* Use the PrismaAreaAdapter to get the Message from the database */
        let messageResponse = await messageForeclosureUseCase.getMessageForeclosure(filter)

        /* If the message is not found, return a 204 error */
        if (!messageResponse || messageResponse instanceof Error) {
          res.status(204).json([]);
          return;
        }

        let preparedData = prepareForclosure(messageResponse, filter);

        /* Return the message */
        res.status(200).json(preparedData);

      } catch (error) {
        console.error('Error fetching message:', error);
        res.status(400).json(new Error('Internal server error'));
      }
}
