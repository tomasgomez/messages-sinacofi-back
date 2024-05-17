import { fetchIDCSConfig } from "@/backend/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";


export async function get(req: NextApiRequest, res: NextApiResponse < any >, detail: boolean = false){
    try {
        console.log('# auth');
        await fetchIDCSConfig();
        res.status(200).json({});
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json(new Error('Internal server error'));
    }
}