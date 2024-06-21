import { docUseCase } from "@/backend/usecases/docs/usecases";
import { NextApiRequest, NextApiResponse } from "next";
import { Documents } from "@/backend/entities/message/interface";

export async function get(req: NextApiRequest, res: NextApiResponse < any >){
    try {
        const { id } = req.query

        if (!id){
            res.status(400).json({error: "id is required" })
            return;
        }

        const request: Documents = {
            id: id as string
        }
        
        let document = await docUseCase.findDoc(request)

        /* If the message is not found, return a 204 error */
        if (!document || document instanceof Error) {
          res.status(204).json([]);
          return;
        }

        /* Return the message */
        res.status(200).json(document);
        return;

      } catch (error) {
        console.error('Error fetching message:', error);
        res.status(400).json(new Error('Internal server error'));
      }
}
