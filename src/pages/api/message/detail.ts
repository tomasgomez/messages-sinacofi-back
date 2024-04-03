import { NextApiRequest, NextApiResponse } from 'next';
import { Methods } from '@/backend/entities/http';
import { errorHandler } from '@/backend/utils/errorHandler'

// import calls
import { messageDetailCalls } from '@/backend/handler/messageDetail/handler';

/*
Message Detail API
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse < any > ) {
  try {
    const method = req.method;
    switch (method) {
      case Methods.GET: messageDetailCalls.GET(req, res);
        break;
      default:
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.log('Error:', error);
    errorHandler(error, req, res);
  }
}