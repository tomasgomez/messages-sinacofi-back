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
    client_id: process.env.IAM_CLIENT_ID as string,
    client_secret: process.env.IAM_CLIENT_SECRET,
    // redirect_uris: [process.env.IAM_REDIRECT_URL as string, process.env.NEXTAUTH_URL as string],
    // post_logout_redirect_uris: [process.env.IAM_REDIRECT_URL as string, process.env.NEXTAUTH_URL as string],
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
      // client:{
      //   redirect_uris: [process.env.IAM_REDIRECT_URL as string, process.env.NEXTAUTH_URL as string],
      //   post_logout_redirect_uris: [process.env.IAM_REDIRECT_URL as string, process.env.NEXTAUTH_URL as string],
      // },
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
      profile(profile:any){
        return {
          id: profile.user_id,
          name: profile.user_displayname,
          dni: profile.sub
        };
      }
    },
  ];

  const callbacks = {
    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      // added to session
      session.user.dni = token.dni;
      return session;
    },
    async jwt({token, user, account}:{ token: any, user: any, account: any, profile?: any }) {
      // added to session
      if (user) {
        token.id = user.id;
        token.dni = user.dni;
        // Otras propiedades personalizadas
      }
      
      if (account?.id_token) {
          token.idToken = account.id_token;
          token.refreshToken = account.refresh_token;
          token.accessToken = account.access_token;
      }
      return token;
    },
    async redirect({ url, baseUrl }: { url: any, baseUrl: any }) {
      if(url.startsWith(process.env.IAM_SIGN_OUT_URL)){        
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