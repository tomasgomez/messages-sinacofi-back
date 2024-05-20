

import { NextRequest, NextResponse } from 'next/server'

 
// Get the IDCS URL based on secure or non-secure environment

const clientId = '170d6a37e12c41e789c3fac3ceca653f';
const clientSecret = 'beb6a6c4-8d38-46a4-a3fe-167c3f6b2fe0';
const redirectUri = 'http://localhost:3000/callback';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, res: NextResponse) {
    let idcsConfig: any = {};
    const getIDCSURL = (isSecure: boolean, urlName: string) => {
      let urlConfig =  {
        authorizationEndpoint: isSecure ? idcsConfig.secure_authorization_endpoint : idcsConfig.authorization_endpoint,
        tokenEndpoint: isSecure ? idcsConfig.secure_token_endpoint : idcsConfig.token_endpoint,
        userinfoEndpoint: isSecure ? idcsConfig.secure_userinfo_endpoint : idcsConfig.userinfo_endpoint,
        jwksUri: isSecure ? idcsConfig.secure_jwks_uri : idcsConfig.jwks_uri,
      };
      //@ts-ignore
      return urlConfig[urlName];
    };
// Fetch the IDCS configuration
  const fetchIDCSConfig = async () => {
    try {
      const response = await fetch('https://idcs-1e0f415dd2bf423c8296ebb063528eca.identity.oraclecloud.com/.well-known/idcs-configuration');
      const data = await response.json()
      idcsConfig = data['openid-configuration'];
    } catch (error) {
      console.error('Error fetching IDCS configuration:', error);
    }
  };
  await fetchIDCSConfig();

  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if(code) {
    return NextResponse.redirect('api/auth');
  }
    // const codeVerifier ='codeVerifier';
    // const codeChallenge = 'codeChallenge';

    // Store the codeVerifier in the session
    // req.session.codeVerifier = codeVerifier;
    const url = getIDCSURL(false, 'authorizationEndpoint');
  
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'openid profile email groups',
      code_challenge: 'codeChallenge',
      code_challenge_method: 'S256',
    });
  
    const authUrl = `${url}?` + params
    return NextResponse.redirect(authUrl);
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}