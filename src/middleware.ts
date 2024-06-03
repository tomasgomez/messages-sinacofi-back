import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'
import { iamOracleAPI } from './backend/iamOracle/handler/api';
import { generateCodeChallenge, generateCodeVerifier } from './backend/iamOracle/entities/idcs';
import { createAuthURL } from './backend/handler/middleware/IAM-oracle/authUrl';

const deleteSession = (res: NextResponse) => {
  res.cookies.delete('access_token')
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if(process.env.NEXT_PUBLIC_TEST_ENV === "true"){
    return NextResponse.next();
  }
  const idcs = await iamOracleAPI.getWellKnown();
  if (idcs instanceof Error) {
    console.log('error', idcs);
    return NextResponse.redirect(new URL('/not_found', request.url));
  }

  const access_token = cookies().get('access_token')?.value;

  // get the path and code on the url
  const path = request.nextUrl.pathname;
  const code = request.nextUrl.searchParams.get('code') || '';
  const codeChallenge = cookies().get('codeChallenge')?.value 

  if(access_token){
    //@ts-ignore
    let tokenDecoded = await iamOracleAPI.validateToken(idcs, access_token!);
    if (tokenDecoded instanceof Error) {
        console.log('error', tokenDecoded);
        // TODO: redirect to page error
        let response = NextResponse.redirect(new URL('/', request.url));
        deleteSession(response);
        return response;
    }

    return NextResponse.next();
  }

  // check url and code to handling the code to token
  
  if (path .includes('/callback')) {
    const idcs = await iamOracleAPI.getWellKnown();
    if (idcs instanceof Error) {
      // TODO: redirect to page error
      return NextResponse.redirect(new URL('/', request.url));
    }
    // validate the token
    //@ts-ignore
    const tokenResponse = await iamOracleAPI.authCode(idcs, code, codeChallenge!);
    if (tokenResponse instanceof Error) {
      console.log('error', tokenResponse);
      // TODO: redirect to page error
      // NextResponse.redirect('/');
      const response = NextResponse.redirect(new URL('/', request.url));
      return response;
    }

    const { access_token, refresh_token } = tokenResponse;
    const tokenDecoded = await iamOracleAPI.validateToken(idcs, access_token);
    if (tokenDecoded instanceof Error) {
      // TODO: redirect to page error
      const response = NextResponse.redirect(new URL('/', request.url));
      return response;
    }
    let response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('access_token', access_token);
    // response.cookies.set('refresh_token', refresh_token);
    response.cookies.set('user_info', tokenDecoded);
    return response;
  }

  // if the user has session get cookies
  
  // const refresh_token = cookies().get('refresh_token')?.value;

  // check if tokens exist
  if (!access_token){
    // fetch config
    const idcs = await iamOracleAPI.getWellKnown();
    if (idcs instanceof Error) {
      console.log(idcs)
      // TODO: redirect to page error
      const response = NextResponse.redirect(new URL('/', request.url));
      return response;
    }
    // create codeChallenge
    const code = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(code);
    console.log(code)
    const url = createAuthURL(idcs, codeChallenge);
    const urlToBeRedirected = new URL(url);
    let response = NextResponse.redirect(urlToBeRedirected);
    response.cookies.set('codeChallenge', code);
    return response;
  }

  // user has session then refresh token
  
    if (idcs instanceof Error) {
      console.log(idcs)
      // TODO: redirect to page error
      const response = NextResponse.redirect('/');
      return response;
  }

  // validate token
  // Validate the token (sub could be used to identify the user)
  const tokenDecoded = await iamOracleAPI.validateToken(idcs, access_token!);
  if (tokenDecoded instanceof Error) {
      console.log('error', tokenDecoded);
      // TODO: redirect to page error
      const response = NextResponse.redirect(new URL('/', request.url));
      return response;
  }

  let response = NextResponse.redirect(new URL('/', request.url))
  
  response.cookies.set('access_token', access_token);
  response.cookies.set('user_info', tokenDecoded);
  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|not_found|.*\\.png$).*)',
}
