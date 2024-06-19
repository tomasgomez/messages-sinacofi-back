import { NextApiRequest, NextApiResponse } from "next";

// import { iamOracleAPI } from "@/backend/iamOracle/handler/api";
// import { parseCookies } from '@/backend/utils/auth';

import PERMISSION_ACCESS from './PERMISSION_ACCESS.json';
import { userRoles } from './userRoles';
import { getToken } from "next-auth/jwt"
import { getUser } from "../user/get";
import { User } from "@/backend/entities/user/user";



// get message function
export async function get(req: NextApiRequest, res: NextApiResponse < any > ){
    try {
      const token = await getToken({req})
      
      if(process.env.NEXT_PUBLIC_TEST_ENV === "true"){
        const permissions = PERMISSION_ACCESS["FullAccess"];
        const userData = { 
          user: userRoles["18782721-3"],
          permissions
        }
        res.status(200).json(userData);
      }
        // const { access_token } = parseCookies(req.headers.cookie as string)
      
        // const idcs = await iamOracleAPI.getWellKnown();
        //@ts-ignore
        // const tokenDecoded = await iamOracleAPI.validateToken(idcs, access_token!);
        //@ts-ignore
        if(token && token.dni !== ''){
          let user =  await getUser(token.dni!)
          if (getUser instanceof Error){
            res.status(400).json([]);
            return; 
          }
          user = user as User;
          const permissions = PERMISSION_ACCESS[user.role as keyof typeof PERMISSION_ACCESS];
  
          const userData = { 
              user: user,
              permissions
          };
  
          res.status(200).json(userData);
        }else {
          throw Error('')
        }
        return;
      } catch (error) {
        res.status(500).json(new Error('Internal server error'));
        return;
      }
}