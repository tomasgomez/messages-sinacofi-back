import { adaptSchemaTypes } from "@/backend/handler/schemaTypes/presenter/adaptSchemaTypes";
import { validateGetSchemaTypes } from "@/backend/handler/schemaTypes/presenter/getSchema";
import { schemaUseCase } from "@/backend/usecases/schema/usecases";
import { NextApiRequest, NextApiResponse } from "next";


// get Schema function
export async function getSchemaTypes(req: NextApiRequest, res: NextApiResponse < any > ){
    try {

        /* Validate the query params and get the Schema */
        let filter = validateGetSchemaTypes(req.query);

        if (filter instanceof Error) {
          res.status(400).json([]);
          return;
        }

        /* Use the PrismaAreaAdapter to get the Schema from the database */
        let schemaResponse = await schemaUseCase.getSchemaTypes(filter)

        /* If the Schema is not found, return a 204 error */
        if (schemaResponse instanceof Error) {
          res.status(204).json([]);
          return;
        }
    

        let adaptedShema = adaptSchemaTypes(schemaResponse);

        /* Return the Schema */
        res.status(200).json(adaptedShema);
        return;

      } catch (error) {

        console.error('Error fetching Schema:', error);
        res.status(500).json(new Error('Internal server error'));
        return;
      }
}