import { validateGetMessageForeclosure } from "@/backend/presenter/foreclosure/getMessage";
import { messageForeclosureUseCase } from "@/backend/usecases/messageForeclosure/usecases";
import { NextApiRequest, NextApiResponse } from "next";
import { message670 } from "@/utils/messageForeclosure";

export async function get(req: NextApiRequest, res: NextApiResponse < any >, detail: boolean = false){
    try {

        /* Validate the query params and get the Message */
        let result = validateGetMessageForeclosure(req.query);

        if (result instanceof Error) {
          res.status(400).json(result);
          return;
        }

        let [message] = result;

        // /* Use the PrismaAreaAdapter to get the Message from the database */
        // let messageResponse = await messageForeclosureUseCase.getMessageForeclosure(message)

        // /* If the message is not found, return a 404 error */
        // if (!messageResponse) {
        //   res.status(404).json(new Error('message not found'));
        //   return;
        // }

        if (detail) {
          // /* Return the message */
          res.status(200).json(message);
          return;
        }

        /* Return the message */
        res.status(200).json(message670);

      } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json(new Error('Internal server error'));
      }
}
