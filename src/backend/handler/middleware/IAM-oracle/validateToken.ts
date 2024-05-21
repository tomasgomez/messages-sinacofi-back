import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { redirectToAuth } from '@/backend/handler/middleware/IAM-oracle/auth';
import { iamOracleAPI } from "../../../iamOracle/handler/api";



export const validateToken = async (request: NextRequest, res: NextResponse) => {

    try {
        const idcs = await iamOracleAPI.getWellKnown();
        if (idcs instanceof Error) {
            console.log(idcs)
            // TODO: redirect to page error
            // NextResponse.redirect('/');
            NextResponse.next()
        }
        const access_token = cookies().get('access_token')?.value;

        // Validate the token (sub could be used to identify the user)
        const tokenDecoded = await iamOracleAPI.validateToken(idcs, access_token!);
        if (tokenDecoded instanceof Error) {
            console.log('error', tokenDecoded);
            // TODO: redirect to page error
            // NextResponse.redirect('/');
        }
        console.log("----");
        console.log(tokenDecoded);
        console.log("-----");
        // set user info
        cookies().set('user_info', tokenDecoded);
    } catch(error){
        console.log("error", error)
        // NextResponse.redirect('/');
        NextResponse.next()
    }

    NextResponse.next();
    

}