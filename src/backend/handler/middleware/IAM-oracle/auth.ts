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
        // NextResponse.redirect('/');
        NextResponse.next()
    }
    // create codeChallenge
    const code = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(code);

    console.log(codeChallenge)
    // set cookies values
    const url = createAuthURL(idcs, codeChallenge);
    
    NextResponse.redirect(url).headers.set('codeChallenge', codeChallenge);
}



