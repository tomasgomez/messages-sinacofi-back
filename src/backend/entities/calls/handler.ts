import { APICalls } from '@/backend/entities/calls/calls';
import { NextApiRequest, NextApiResponse } from "next";

export abstract class Handler implements APICalls {
    // Get
    async GET(req: NextApiRequest, res: NextApiResponse < any > ): Promise<any>{
        res.status(405).end(`Method GET Not implemented`);
    };
    // Post
    async POST(req: NextApiRequest, res: NextApiResponse < any > ){
        res.status(405).end(`Method POST Not implemented`);
    };
    // Put 
    async PUT(req: NextApiRequest, res: NextApiResponse < any > ){
        res.status(405).end(`Method PUT Not implemented`);
    };
    // Delete 
    async DELETE(req: NextApiRequest, res: NextApiResponse < any > ){
        res.status(405).end(`Method DELETE Not implemented`);
    }
}