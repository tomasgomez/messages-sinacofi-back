import { NextApiRequest, NextApiResponse } from 'next';
import { Methods } from '@/backend/entities/calls/http';
import { errorHandler } from '@/backend/utils/errorHandler';

// import calls
import { messageCalls } from '@/backend/handler/message/handler';

/*
Message API 
*/ 
export default async function handler(req: NextApiRequest, res: NextApiResponse < any > ) {
  try {
    const method = req.method;
    switch (method) {
      case Methods.GET: await messageCalls.GET(req, res);
        return;
      case Methods.PUT: await messageCalls.PUT(req, res);
        return;
      case Methods.POST: await messageCalls.POST(req, res);
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
