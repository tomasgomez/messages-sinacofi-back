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

        if (filter instanceof Error) {
          res.status(400).json([]);
          return;
        }

        // const token = await getToken({req});
        // if (!token || token.dni ==''){
        //   res.status(400).json([]);
        //   return;
        // }

        // let user = await getUser(token.dni!);
        // if (user instanceof Error){
        //   res.status(400).json([]);
        //   return; 
        // }

        // filter.institutionCode = user.institutionCode ? [user.institutionCode] : filter.institutionCode;
        
        /* Use the PrismaAreaAdapter to get the Message from the database */
        let pagination = await messageForeclosureUseCase.getMessageForeclosure(filter)        

        /* If the message is not found, return a 204 error */
        if (!pagination || pagination instanceof Error) {
          res.status(204).json([]);
          return;
        }

        let preparedData = prepareForclosure(pagination.data, filter);

        /* Return the message */
        res.status(200).json({meta: pagination.meta, data: preparedData});

      } catch (error) {
        console.error('Error fetching message:', error);
        res.status(400).json(new Error('Internal server error'));
      }
}
