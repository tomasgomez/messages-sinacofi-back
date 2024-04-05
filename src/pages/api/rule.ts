import { NextApiRequest, NextApiResponse } from 'next';
import { Methods } from '@/backend/entities/http';
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
      case Methods.GET: /*await messageCalls.GET(req, res);
        return;*/
        res.status(200).json(ruleTypes);
        return;

      case Methods.PUT: /*await messageCalls.PUT(req, res);
        return;*/
        res.status(200).json(req.body);
      case Methods.POST: /*await messageCalls.POST(req, res);
        return;*/
        res.status(201).json(req.body);
      default:
        res.status(405).end(`Method ${method} Not Allowed`);
    }
    return;
  } catch (error: any) {
    console.log('Error:', error);
    errorHandler(error, req, res);
  }
}


var ruleTypes = [{
    "id": "1",
    "messageCode": "199",
    "description": "TEXTO LIBRE"
  },
  {
    "id": "2",
    "messageCode": "136",
    "description": "TRANSFERENCIA DE FONDOS INDIVIDUAL"
  },
  ]
