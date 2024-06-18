import { validateGetMessage } from "@/backend/handler/message/presenter/getMessage";
import { messageDetailUseCase } from "@/backend/usecases/messageDetail/usecases";
import { prepareMessages } from "@/backend/handler/message/adapter/prepareMessages";
import { NextApiRequest, NextApiResponse } from "next";

export async function get(req: NextApiRequest, res: NextApiResponse < any > ){
    try {
        /* Validate the query params and get the Message */
        let result = validateGetMessage(req);

        if (result instanceof Error) {
          res.status(400).json(result);
          return;
        }

        let filter = result;

        /* Use the PrismaAreaAdapter to get the Message from the database */
        let messageResponse = await messageDetailUseCase.getMessageDetail(filter)

        /* If the message is not found, return a 204 error */
        if (!messageResponse || messageResponse instanceof Error) {
          res.status(204).json([]);
          return;
        }

        let preparedData = prepareMessages(messageResponse);

        /* Return the message */
        res.status(200).json(preparedData);

      } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json(new Error('Internal server error'));
      }
}