import { Methods } from "@/backend/entities/calls/http";
import { errorHandler } from "@/backend/utils/errorHandler";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt"
import qs from "qs";

export default async function handler(req: NextApiRequest, res: NextApiResponse < any > ) {
  try {
    const method = req.method;    
    switch (method) {
      case Methods.GET: 
        const token = await getToken({req})        
        const endSessionURL = process.env.IAM_SIGN_OUT_URL;
        const redirectURL = process.env.NEXTAUTH_URL;
        const endSessionParams = new URLSearchParams({
          id_token_hint: token?.idToken,
          post_logout_redirect_uri: `${redirectURL}/callback`,
        } as any)
        const fullUrl = `${endSessionURL}?${endSessionParams.toString()}`;
        res.json({url:fullUrl});
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