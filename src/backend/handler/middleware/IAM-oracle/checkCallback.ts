import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { redirectToAuth } from '@/backend/handler/middleware/IAM-oracle/auth';
import { iamOracleAPI } from "../../../iamOracle/handler/api";



export const checkCallback = async (request: NextRequest, res: NextResponse) => {

    // get the path and code on the url
    const path = request.nextUrl.pathname;
    const code = request.nextUrl.searchParams.get('code');
    const codeChallenge = cookies().get('codeChallenge')?.value   
    
    // redirect to login
    if (!codeChallenge){
        redirectToAuth(request, res);
    } 
    // check path
    if (path.includes('/api/auth') && code) {
        const idcs = await iamOracleAPI.getWellKnown();
        if (idcs instanceof Error) {
            console.log(idcs)
            // TODO: redirect to page error
            // NextResponse.redirect('/');
            NextResponse.next();
        }
        console.log(idcs);
        // validate the token
        const tokenResponse = await iamOracleAPI.authCode(idcs, code, codeChallenge!);
        if (tokenResponse instanceof Error) {
            console.log('error', tokenResponse);
            // TODO: redirect to page error
            // NextResponse.redirect('/');

            NextResponse.next()
        }

        try {
        const { access_token, refresh_token } = tokenResponse;
            // Validate the token (sub could be used to identify the user)
            const tokenDecoded = await iamOracleAPI.validateToken(idcs, access_token);
            if (tokenDecoded instanceof Error) {
                console.log('error', tokenDecoded);
                // TODO: redirect to page error
                // NextResponse.redirect('/');
                NextResponse.next();
            }
            cookies().set('access_token', access_token);
            cookies().set('refresh_token',refresh_token);
        } catch(error){
            console.log("error", error)
            // NextResponse.redirect('/');
            NextResponse.next();
        }

        NextResponse.next();
    }

}