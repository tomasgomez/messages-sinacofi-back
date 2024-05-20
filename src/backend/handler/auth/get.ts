import { fetchIDCSConfig } from "@/backend/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function get(req: NextApiRequest, res: NextApiResponse < any >, detail: boolean = false){
    try {
        return NextResponse.next()
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json(new Error('Internal server error'));
    }
}