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

// import calls
import {
    schemaCalls
} from '@/backend/handler/schema/handler';

/*
Message API 
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse < any > ) {
    try {
        const method = req.method;
        switch (method) {
            case Methods.GET:
                await schemaCalls.PUT(req, res);
                return;
            case Methods.PUT:
                await schemaCalls.PUT(req, res);
                return;
            case Methods.POST:
                /*await messageCalls.POST(req, res);
                       return;*/
                res.status(200).json(req.body);
            default:
                res.status(405).end(`Method ${method} Not Allowed`);
        }
        return;
    } catch (error: any) {
        console.log('Error:', error);
        errorHandler(error, req, res);
    }
}