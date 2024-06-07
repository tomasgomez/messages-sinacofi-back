import NextAuth, { AuthOptions } from "next-auth"
import { Provider }  from "next-auth/providers/index";
import { generateCodeChallenge, generateCodeVerifier, getAccessToken } from "@/backend/utils/auth";
import { Issuer, custom } from "openid-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const token = await getAccessToken();
  const code = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(code);
 
  const iss = await Issuer.discover(process.env.IAM_BASE_URL || '');
  iss[custom.http_options] = (url, options) => {
    return {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const client = new iss.Client({
    client_id: 'b78f033d556e47bda9dc206a0830f14b',
    client_secret: '0d5f753f-6618-4d51-ae96-f727afbced35',
    redirect_uris: [process.env.IAM_REDIRECT_URL as string],
    response_types: ['code'],
    scope: ["openid", "offline_access", "email", "profile"],
    id_token_signed_response_alg: 'RS256',
    default_max_age: 3600,
    require_auth_time: true,
    tls_client_certificate_bound_access_tokens: false,
    request_object_signing_alg: 'RS256',
    introspection_endpoint_auth_signing_alg: 'RS256',
    revocation_endpoint_auth_signing_alg: 'RS256',
    token_endpoint_auth_signing_alg: 'RS256',
    userinfo_signed_response_alg: 'RS256',
    authorization_signed_response_alg: 'RS256',
  })

  const providers: Provider[] = [
    {
      id: 'oidc',
      name: 'OIDC',
      type: 'oauth',
      version: '2.0',
      wellKnown: process.env.IAM_BASE_URL,
      clientId: process.env.IAM_CLIENT_ID,
      clientSecret: process.env.IAM_CLIENT_SECRET,
      authorization: {
        url: process.env.IAM_AUTHORIZATION_URL,
        params: {
          scope: 'openid profile email offline_access',
          redirect_uri: process.env.IAM_REDIRECT_URL,
        },
        request(context){
          context.client.authorizationUrl({
            scope: 'openid email profile',
            code_challenge:codeChallenge,
            code_challenge_method: 'S256'
        });
        }
      },
      token: {
        url: process.env.IAM_VALIDATE_TOKEN_URL,
        async request(context) {
          const params = context.client.callbackParams(req);
          const tokenSet = await client.callback(process.env.IAM_REDIRECT_URL , params, {
            response_type: 'code',
            code_verifier: code,   
            state: context.checks.state,
          });  
          return { tokens: tokenSet }
        }
      },
      async profile(profile: any) {
        return {
          id: profile.user_id,
          name: profile.user_displayname,
          // email: profile.email
        };
      },
    },
  ];

  const callbacks = {
    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({token, user, account}:{ token: any, user: any, account: any, profile?: any }) {
      if (account?.id_token) {
          token.idToken = account.id_token;
      }
      return token;
    },
    async redirect({ url, baseUrl }: { url: any, baseUrl: any }) {
      console.log(url, baseUrl);
      if(url.startsWith('https://idcs-1e0f415dd2bf423c8296ebb063528eca.identity.oraclecloud.com/oauth2/v1/userlogout')){
        return url;
      }
      // if(url ==='/api/signout'){
      //   client.revoke();
      //   // const ssoLogoutUrl = process.env.IAM_SIGN_OUT_URL;
      //   // const redirectUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      //   // const signoutWithRedirectUrl = `${ssoLogoutUrl}`;
      //   return baseUrl;
      // }
      return url.startsWith(baseUrl) ? `${url}` : baseUrl;
    }
  };
  
  const options: AuthOptions = {
    providers,
    callbacks,
    // pages: {signIn: '/auth/signIn'}
  }
  return NextAuth(req, res, options);

};