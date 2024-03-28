import {
  NextApiRequest,
  NextApiResponse,
} from 'next';


import {
  Methods
} from '../../backend/entities/http';

import {
  errorHandler,
} from '@/backend/utils/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse < any > ) {
  try {
    const method = req.method;

    switch (method) {
      case Methods.GET:
        try {

          res.status(200).json("");

        } catch (error) {
          console.error('Error fetching Area:', error);
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