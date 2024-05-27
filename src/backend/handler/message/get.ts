import { validateGetMessage } from "@/backend/handler/message/presenter/getMessage";
import { messageUseCase } from "@/backend/usecases/message/usecases";
import { NextApiRequest, NextApiResponse } from "next";
import { prepareMessages } from "@/backend/handler/message/adapter/prepareMessages";

// get message function
export async function get(req: NextApiRequest, res: NextApiResponse < any > ){
    try {
        /* Validate the query params and get the Message */
        let filter = validateGetMessage(req);

        if (filter instanceof Error) {
          res.status(400).json([]);
          return;
        }
        console.log("FILTER", filter)

        /* Use the PrismaAreaAdapter to get the Message from the database */
        let messageResponse = await messageUseCase.getMessage(filter)
        console.log("MESSAGE RESPONSE", messageResponse)

        /* If the message is not found, return a 204 error */
        if (messageResponse instanceof Error) {
          res.status(204).json([]);
          return;
        }

        console.log("MESSAGE RESPONSE2", messageResponse)
        let preparedData = prepareMessages(messageResponse, filter);
        console.log("PREPARED DATA", preparedData)

        /* Return the message */
        res.status(200).json(preparedData);
        return;

      } catch (error) {
        console.log('Error fetching message:', error);
        res.status(500).json(new Error('Internal server error'));
        return;
      }
}
