import { validateGetMessageForeclosure } from "@/backend/handler/foreclosure/presenter/getMessage";
import { messageForeclosureUseCase } from "@/backend/usecases/foreclosure/usecases";
import { NextApiRequest, NextApiResponse } from "next";
import { prepareForclosure } from "./adapter/prepareForeclosure";
import { getToken } from "next-auth/jwt";
import { getUser } from "../user/get";

export async function get(req: NextApiRequest, res: NextApiResponse < any >){
    try {
        /* Validate the query params and get the Message */
        let filter = validateGetMessageForeclosure(req.query);

        let user: any = {};
        
        if (filter instanceof Error) {
          res.status(400).json([]);
          return;
        }
        if (process.env.NEXT_PUBLIC_TEST_ENV !== "true") {

          const token = await getToken({req});
          if (!token || token.dni ==''){
            res.status(400).json([]);
            return;
          }

          user = await getUser(token.dni!);
          if (user instanceof Error){
            res.status(400).json([]);
            return; 
          }
        }

        filter.institutionCode = user.institutionCode ? [user.institutionCode] : filter.institutionCode;
        
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
