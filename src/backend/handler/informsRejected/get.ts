import { cukInformsUseCase } from "@/backend/usecases/informs/usecases";
import { NextApiRequest, NextApiResponse } from "next";
import { prepareInformRejected } from "./adapter/prepareInformRejected";
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
        let pagination = await cukInformsUseCase.getInformsRejected(filter)

        /* If the message is not found, return a 204 error */
        if (!pagination || pagination instanceof Error) {
          res.status(204).json([]);
          return;
        }

        res.status(200).json({meta: pagination.meta, data: prepareInformRejected(pagination.data)});

      } catch (error) {
        console.error('Error fetching message:', error);
        res.status(400).json(new Error('Internal server error'));
      }
}
