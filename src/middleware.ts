

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'
import { redirectToAuth } from './backend/handler/middleware/IAM-oracle/auth';
import { refreshToken } from './backend/handler/middleware/IAM-oracle/refreshToken';
import { validateToken } from './backend/handler/middleware/IAM-oracle/validateToken';
import { checkCallback } from './backend/handler/middleware/IAM-oracle/checkCallback';
import { iamOracleAPI } from './backend/iamOracle/handler/api';
import { generateCodeChallenge, generateCodeVerifier } from './backend/iamOracle/entities/idcs';
import { createAuthURL } from './backend/handler/middleware/IAM-oracle/authUrl';


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  // get the path and code on the url
  const path = request.nextUrl.pathname;
  const code = request.nextUrl.searchParams.get('code');
  const codeChallenge = cookies().get('codeChallenge')?.value 
  
  // check url and code to handling the code to token
  console.log(path)
  console.log(code)
  console.log(path == '/api/auth' && code)
  if (path == '/api/auth' && code) {
    const idcs = await iamOracleAPI.getWellKnown();
    if (idcs instanceof Error) {
      console.log(idcs)
      // TODO: redirect to page error
      // NextResponse.redirect('/');
      return NextResponse.redirect('/');
    }
    console.log(idcs);
    // validate the token
    const tokenResponse = await iamOracleAPI.authCode(idcs, code, codeChallenge!);
    if (tokenResponse instanceof Error) {
      console.log('error', tokenResponse);
      // TODO: redirect to page error
      // NextResponse.redirect('/');
      const response = NextResponse.redirect('/');
      return response;
    }

    const { access_token, refresh_token } = tokenResponse;

    const tokenDecoded = await iamOracleAPI.validateToken(idcs, access_token);
    if (tokenDecoded instanceof Error) {
      console.log('error', tokenDecoded);
      // TODO: redirect to page error
      // NextResponse.redirect('/');
      const response = NextResponse.redirect('/');
      return response;
    }
    let response = NextResponse.next();
    response.cookies.set('access_token', access_token);
    response.cookies.set('refresh_token', refresh_token);
    response.cookies.set('user_info', tokenDecoded);
    console.log(tokenDecoded);
    return response;
  
  }
  
  // if the user has session
  // get cookies
  const access_token = cookies().get('access_token')?.value;
  const refresh_token = cookies().get('refresh_token')?.value;

  // check if tokens exist
  if (!access_token || !refresh_token){
    // fetch config
    const idcs = await iamOracleAPI.getWellKnown();
    if (idcs instanceof Error) {
      console.log(idcs)
      // TODO: redirect to page error
      // NexResponse.redirect('/');
      const response = NextResponse.redirect('/');
      return response;
    }
    // create codeChallenge
    const code = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(code);
    console.log(codeChallenge)
    const url = createAuthURL(idcs, codeChallenge);
    const urlToBeRedirected = new URL(url);
    let response = NextResponse.redirect(urlToBeRedirected);
    response.cookies.set('codeChallenge', codeChallenge);
    return response;
  
  }

  // user has session then refresh token
  const idcs = await iamOracleAPI.getWellKnown();
    if (idcs instanceof Error) {
      console.log(idcs)
      // TODO: redirect to page error
      // NextResponse.redirect('/');
      const response = NextResponse.redirect('/');
      return response;
  }
  const tokenData = await iamOracleAPI.refreshToken(idcs, refresh_token!);
  if (tokenData instanceof Error) {
      console.log('error', tokenData);
      // TODO: redirect to page error
      // NextResponse.redirect('/');
      const response = NextResponse.redirect('/');
      return response;
  }
  // validate token
  const { access_token_updated, refresh_token_updated } = tokenData;
  // Validate the token (sub could be used to identify the user)
  const tokenDecoded = await iamOracleAPI.validateToken(idcs, access_token_updated!);
  if (tokenDecoded instanceof Error) {
      console.log('error', tokenDecoded);
      // TODO: redirect to page error
      const response = NextResponse.redirect('/');
      return response;
  }

  let response = NextResponse.next()
  console.log("----");
  console.log(tokenDecoded);
  console.log("-----");
  
  response.cookies.set('access_token', access_token_updated);
  response.cookies.set('refresh_token',refresh_token_updated);
  response.cookies.set('user_info', tokenDecoded);
  return response;
  // NextResponse.next();

}


// export async function middleware(request: NextRequest, res: NextResponse) {
//     let idcsConfig: any = {};
//     const getIDCSURL = (isSecure: boolean, urlName: string) => {
//       let urlConfig =  {
//         authorizationEndpoint: isSecure ? idcsConfig.secure_authorization_endpoint : idcsConfig.authorization_endpoint,
//         tokenEndpoint: isSecure ? idcsConfig.secure_token_endpoint : idcsConfig.token_endpoint,
//         userinfoEndpoint: isSecure ? idcsConfig.secure_userinfo_endpoint : idcsConfig.userinfo_endpoint,
//         jwksUri: isSecure ? idcsConfig.secure_jwks_uri : idcsConfig.jwks_uri,
//       };
//       //@ts-ignore
//       return urlConfig[urlName];
//     };
// // Fetch the IDCS configuration
//   const fetchIDCSConfig = async () => {
//     try {
//       const response = await fetch('https://idcs-1e0f415dd2bf423c8296ebb063528eca.identity.oraclecloud.com/.well-known/idcs-configuration');
//       const data = await response.json()
//       idcsConfig = data['openid-configuration'];
//     } catch (error) {
//       console.error('Error fetching IDCS configuration:', error);
//     }
//   };
//   await fetchIDCSConfig();

//   const searchParams = request.nextUrl.searchParams
//   const code = searchParams.get('code')

//   if(code) {
//     return NextResponse.next();
//   }
//     // const codeVerifier ='codeVerifier';
//     // const codeChallenge = 'codeChallenge';

//     // Store the codeVerifier in the session
//     // req.session.codeVerifier = codeVerifier;
//     const url = getIDCSURL(false, 'authorizationEndpoint');
  
//     const params = new URLSearchParams({
//       response_type: 'code',
//       client_id: clientId,
//       redirect_uri: redirectUri,
//       scope: 'openid profile email groups',
//       code_challenge: 'codeChallenge',
//       code_challenge_method: 'S256',
//     });
  
//     const authUrl = `${url}?` + params
//     return NextResponse.redirect(authUrl);
// }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}

