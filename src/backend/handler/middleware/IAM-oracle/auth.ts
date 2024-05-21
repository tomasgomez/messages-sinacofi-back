import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { iamOracleAPI } from '@/backend/iamOracle/handler/api';
import { generateCodeChallenge, generateCodeVerifier, getIDCSURL, Idcs } from '@/backend/iamOracle/entities/idcs';
import { createAuthURL } from '@/backend/handler/middleware/IAM-oracle/authUrl';

export const redirectToAuth = async (request: NextRequest, response: NextResponse) => {
    // fetch config
    const idcs = await iamOracleAPI.getWellKnown();
    if (idcs instanceof Error) {
        console.log(idcs)
        // TODO: redirect to page error
        // NexResponse.redirect('/');
        const response = NextResponse.json({path: '/'});
        return response;
    }
    // create codeChallenge
    const code = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(code);

    console.log(codeChallenge)

    const url = createAuthURL(idcs, codeChallenge);
    const urlToBeRedirected = new URL(url);
    response =  NextResponse.redirect(url)
    response.cookies.set('codeChallenge', codeChallenge, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/',
    });


    return NextResponse.redirect(urlToBeRedirected)
    
}



