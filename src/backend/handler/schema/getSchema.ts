import { validateGetSchema } from "@/backend/handler/schema/presenter/getSchema";
import { schemaUseCase } from "@/backend/usecases/schema/usecases";
import { NextApiRequest, NextApiResponse } from "next";
import { adaptSchema } from "./presenter/adaptSchema";


// get Schema function
export async function get(req: NextApiRequest, res: NextApiResponse < any > ){
    try {
        /* Validate the query params and get the Schema */
        let filter = validateGetSchema(req.query);

        if (filter instanceof Error) {
          res.status(400).json([]);
          return;
        }

        if (!filter.messageCode || filter.messageCode.length === 0) {
          res.status(400).json([]);
          return;
        }

        /* Use the PrismaAreaAdapter to get the Schema from the database */
        let schemaResponse = await schemaUseCase.getSchema(filter.messageCode[0])

        /* If the Schema is not found, return a 204 error */
        if (schemaResponse instanceof Error) {
          res.status(204).json([]);
          return;
        }

        let adaptedSchema = adaptSchema(schemaResponse);

        /* Return the Schema */
        res.status(200).json(adaptedSchema);
        return;

      } catch (error) {

        console.error('Error fetching Schema:', error);
        res.status(500).json(new Error('Internal server error'));
        return;
      }
}