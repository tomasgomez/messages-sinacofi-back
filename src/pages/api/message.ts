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
import * as messageRequests from '@/backend/handler/message';

export default async function handler(req: NextApiRequest, res: NextApiResponse < any > ) {
  try {
    const method = req.method;
    switch (method) {
      case Methods.GET: 
        messageRequests.GET(req, res);
        break;
      case Methods.PUT:
        messageRequests.PUT(req, res);
        break;
      case Methods.POST:
        messageRequests.POST(req, res);
        break;
      default:
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.log('Error:', error);
    errorHandler(error, req, res);
  }
}