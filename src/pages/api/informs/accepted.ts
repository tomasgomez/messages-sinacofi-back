import { NextApiRequest, NextApiResponse } from 'next';
import { Methods } from '@/backend/entities/calls/http';
import { errorHandler } from '@/backend/utils/errorHandler'

// import calls
import { informsAcceptedHandler } from '@/backend/handler/informsAccepted/handler';

/*
Message Detail API
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse < any > ) {
  try {
    const method = req.method;
    switch (method) {
      case Methods.GET:
        await informsAcceptedHandler.GET(req, res);
        return;
      default:
        res.status(405).end(`Method ${method} Not Allowed`);
        return;
    }
  } catch (error: any) {
    console.log('Error:', error);
    errorHandler(error, req, res);
  }
}