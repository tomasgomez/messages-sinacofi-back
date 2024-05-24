import { NextApiRequest, NextApiResponse } from "next";

import { iamOracleAPI } from "@/backend/iamOracle/handler/api";
import { parseCookies } from '@/backend/utils/auth';

import PERMISSION_ACCESS from './PERMISSION_ACCESS.json';
import { userRoles } from './userRoles';

// get message function
export async function get(req: NextApiRequest, res: NextApiResponse < any > ){
    try {
        const { access_token } = parseCookies(req.headers.cookie as string)
       
        const idcs = await iamOracleAPI.getWellKnown();
        //@ts-ignore
        const tokenDecoded = await iamOracleAPI.validateToken(idcs, access_token!);
        //@ts-ignore
        const permissions = PERMISSION_ACCESS[userRoles[tokenDecoded.sub].role];
        res.status(200).json(permissions);
        return;
      } catch (error) {
        res.status(500).json(new Error('Internal server error'));
        return;
      }
}