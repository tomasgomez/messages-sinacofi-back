import { validateUpdateMessageForeclosure } from "@/backend/handler/foreclosure/presenter/updateMessage";
import { messageForeclosureUseCase } from "@/backend/usecases/foreclosure/usecases";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getUser } from "../user/get";

export async function update(req: NextApiRequest, res: NextApiResponse < any >, detail: boolean = false){
    try {

        /* Validate the query params and get the Message */
        let result = validateUpdateMessageForeclosure(req.body);

        if (result instanceof Error) {
          res.status(400).json([]);
          return;
        }

        const token = await getToken({req});
        if (!token || token.dni ==''){
          res.status(400).json([]);
          return;
        }

        let user = await getUser(token.dni!);
        if (user instanceof Error){
          res.status(400).json([]);
          return; 
        }

        let [cuk, message] = result;

        /* Use the PrismaAreaAdapter to get the Message from the database */
        let messageResponse = await messageForeclosureUseCase.updateForeclosure(cuk, message, user);

        /* If the message is not found, return a 204 error */
        if (!messageResponse) {
          res.status(204).json([]);
          return;
        }

        if (messageResponse instanceof Error) {
          res.status(400).json([]);
          return;
        }

        /* Return the message */
        res.status(200).json(messageResponse);

      } catch (error) {
        console.error('Error fetching message:', error);
        res.status(400).json(new Error('Internal server error'));
      }
}
