import { NextApiRequest, NextApiResponse } from "next";
import { scheduleUseCase } from "@/backend/usecases/schedule/usecases";

// get Schema function
export async function get(req: NextApiRequest, res: NextApiResponse < any > ){
    try {

      /* Run cron job to get the schedule */
      scheduleUseCase.getSchedule()

      /* Return the Schema */
      res.status(200).json("");
      return;

      } catch (error) {

        console.error('Error fetching Schema:', error);
        res.status(500).json(new Error('Internal server error'));
        return;
      }
}