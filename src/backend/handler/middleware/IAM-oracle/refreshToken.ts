import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { redirectToAuth } from '@/backend/handler/middleware/IAM-oracle/auth';
import { iamOracleAPI } from "../../../iamOracle/handler/api";

export const refreshToken = async (request: NextRequest, res: NextResponse) => {

    // validate Token
    const access_token = cookies().get('access_token')?.value;
    const refresh_token = cookies().get('refresh_token')?.value;

    if (!access_token || !refresh_token){
        redirectToAuth(request, res);
    }
    const idcs = await iamOracleAPI.getWellKnown();
    if (idcs instanceof Error) {
        console.log(idcs)
        // TODO: redirect to page error
        // NextResponse.redirect('/');
        NextResponse.next()
    }

    // Refresh token
    const tokenData = await iamOracleAPI.refreshToken(idcs, refresh_token!);
    if (tokenData instanceof Error) {
        console.log('error', tokenData);
        // TODO: redirect to page error
        // NextResponse.redirect('/');
        NextResponse.next()
    }

    const { access_token_updated, refresh_token_updated } = tokenData;

    cookies().set('access_token', access_token_updated);
    cookies().set('refresh_token',refresh_token_updated);
}