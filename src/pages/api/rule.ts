import {
  NextApiRequest,
  NextApiResponse
} from 'next';
import {
  Methods
} from '@/backend/entities/calls/http';
import {
  errorHandler
} from '@/backend/utils/errorHandler';


/*
Message API 
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse < any > ) {
  try {
    const method = req.method;
    switch (method) {
      case Methods.GET:

        res.status(200).json(ruleTypes);

        return;

      case Methods.PUT:
        /*await messageCalls.PUT(req, res);
               return;*/
        res.status(200).json(req.body);
        return;
      case Methods.POST:
        /*await messageCalls.POST(req, res);
               return;*/
        res.status(201).json(req.body);
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


export const ruleTypes = [{
    "id": "1",
    "messageCode": "199",
    "description": "TEXTO LIBRE"
  },
  {
    "id": "2",
    "messageCode": "136",
    "description": "TRANSFERENCIA DE FONDOS INDIVIDUAL"
  },
  {
    "id": "3",
    "messageCode": "670",
    "description": "ALZAMIENTO HIPOTECARIO"
  }
]