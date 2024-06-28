import { cukInformsUseCase } from "@/backend/usecases/informs/usecases";
import { NextApiRequest, NextApiResponse } from "next";
import { prepareInformAccepted } from "./adapter/prepareInformAccepted";
import { validateFilterForeclosureAccepted } from "./presenter/validateFilter";

export async function get(req: NextApiRequest, res: NextApiResponse < any >){
    try {
        /* Validate the query params and get the Message */
        let filter = validateFilterForeclosureAccepted(req.query);

        if (filter instanceof Error) {
          res.status(400).json([]);
          return;
        }
        
        /* Use the PrismaAreaAdapter to get the Message from the database */
        let pagination = await cukInformsUseCase.getInformsAccepted(filter)

        /* If the message is not found, return a 204 error */
        if (!pagination || pagination instanceof Error) {
          res.status(204).json([]);
          return;
        }

        /* Return the message */
        res.status(200).json({meta: pagination.meta, data: prepareInformAccepted(pagination.data)});

      } catch (error) {
        console.error('Error fetching message:', error);
        res.status(400).json(new Error('Internal server error'));
      }
}
