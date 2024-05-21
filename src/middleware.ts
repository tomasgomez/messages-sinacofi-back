

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server'
import { redirectToAuth } from './backend/handler/middleware/IAM-oracle/auth';
import { refreshToken } from './backend/handler/middleware/IAM-oracle/refreshToken';
import { validateToken } from './backend/handler/middleware/IAM-oracle/validateToken';
import { checkCallback } from './backend/handler/middleware/IAM-oracle/checkCallback';


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, response: NextResponse) {

  // checkCallback
  return checkCallback(request, response);

  // get cookies
  const access_token = cookies().get('access_token')?.value;
  const refresh_token = cookies().get('refresh_token')?.value;

  // check if tokens exist
  if (!access_token || !refresh_token){
      return await redirectToAuth(request, response);
  }

  // // refresh token
  // await refreshToken(request, response);

  // // validate token
  // await validateToken(request, response);


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

