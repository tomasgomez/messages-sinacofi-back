import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import {
  validateGetMessage,
} from '@/backend/entities/dataCleaning/message';

import {
  Methods
} from '../../backend/entities/http';

import {
  errorHandler,
} from '@/backend/utils/errorHandler';

import {
  getMessageUseCase
} from '@/backend/usecases/message/getMessage';

export default async function handler(req: NextApiRequest, res: NextApiResponse < any > ) {
  try {
    const method = req.method;

    switch (method) {
      case Methods.GET:
        try {

          /* Validate the query params and get the Message */
          let result = validateGetMessage(req.query);

          if (result instanceof Error) {
            res.status(400).json(result);
            return;
          }

          let [message, count, offset] = result;


          /* Use the PrismaAreaAdapter to get the Area from the database */
          let messageResponse = await getMessageUseCase.execute(message, count, offset)

          /* If the message is not found, return a 404 error */
          if (!messageResponse) {
            res.status(404).json(new Error('message not found'));
            return;
          }

          /* Return the message */
          res.status(200).json(messageResponse);

        } catch (error) {
          console.error('Error fetching message:', error);
          res.status(500).json(new Error('Internal server error'));
        }
        break;
      case Methods.PUT:
        try {

          res.status(200).json("");
          return;

        } catch (error) {
          console.error('Error creating Area:', error);
          res.status(500).json(new Error('Internal server error'));
        }
        break;
      case Methods.POST:
        try {

          res.status(201).json("");
          return;
        } catch (error: any) {
          console.error('Error creating Area:', error);
          res.status(500).json(new Error('Internal server error'));
        }



      default:
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.log('Error:', error);
    errorHandler(error, req, res);
  }
}