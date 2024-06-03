import axios from "axios";
import { profile } from "console";
import { OutgoingHttpHeaders } from "http";
import { createLocalJWKSet, jwtVerify } from "jose";
import NextAuth, { AuthOptions }from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { OAuthConfig, Provider } from "next-auth/providers/index";
import { headers } from "next/headers";
import { CustomHttpOptionsProvider, HttpOptions, Issuer, custom } from "openid-client";
import qs from "qs";
import { setCookie, parseCookies } from "nookies";
import { client, getJwkUsingToken } from "@/backend/utils/auth";



export default async function auth(req: any, res: any) {

  // const token = await getAccessToken();
  // const jwksResponse = await getJwkUsingToken(token);
  // const oracleIAMIssuer = await Issuer.discover('https://idcs-1e0f415dd2bf423c8296ebb063528eca.identity.oraclecloud.com/.well-known/openid-configuration');

  // // Asignar la función personalizada a client[custom.http_options]
  // oracleIAMIssuer[custom.http_options] = (url, options) => {
  //   return {
  //     ...options,
  //     headers: {
  //       ...options.headers,
  //       Authorization: `Bearer ${token}`
  //     }
  //   };
  // }

  // const client = new oracleIAMIssuer.Client({
  //   client_id: "b78f033d556e47bda9dc206a0830f14b",
  //   client_secret: '0d5f753f-6618-4d51-ae96-f727afbced35',
  //   redirect_uris: ['http://localhost:3000/callback'],
  //   response_types: ['code'],
  //   scope: ["openid, offline_access, email, profile"],
  //   post_logout_redirect_uris: ['http://localhost:3000/'],
  //   id_token_signed_response_alg: 'RS256',
  //   default_max_age: 3600,
  //   require_auth_time: true,
  //   tls_client_certificate_bound_access_tokens: false,
  //   request_object_signing_alg: 'RS256',
  //   introspection_endpoint_auth_signing_alg: 'RS256',
  //   revocation_endpoint_auth_signing_alg: 'RS256',
  //   token_endpoint_auth_signing_alg: 'RS256',
  //   userinfo_signed_response_alg: 'RS256',
  //   authorization_signed_response_alg: 'RS256',
  // });

  const client_ = await client;
    
  const providers: Provider []= [{
    id: "idcs",
    name: "Oracle IDCS",
    type: "oauth",
    version: "2.0",
    wellKnown: "https://idcs-1e0f415dd2bf423c8296ebb063528eca.identity.oraclecloud.com/.well-known/openid-configuration",
    clientId: 'b78f033d556e47bda9dc206a0830f14b',
    clientSecret: '0d5f753f-6618-4d51-ae96-f727afbced35',
    idToken: true,
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
    authorization: { params: { scope: "openid offline_access email profile" } },
  }];

  const callbacks = {
    async jwt({ token, account }: { token: any, account: any }) {
      if (account) {
        const cookies = parseCookies({ req });
        const accessToken = cookies["next-auth.session-token"];
        const jwkSet = await getJwkUsingToken(accessToken);
        const jwks = {
          keys: jwkSet.keys.map((key: any) => {
            let keyOps = key.key_ops;
            if (key.alg === "RS256") {
              keyOps = ["verify"];
            }
            return { ...key, key_ops: keyOps };
          }),
        };
        const localJWKSet = createLocalJWKSet(jwks);
        const { payload } = await jwtVerify(accessToken, localJWKSet);
        token.accessToken = payload.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.accessToken = token.accessToken;
      return session;
    },
  };

  return NextAuth(req, res, {
    providers,
    callbacks,
  });
};


// const next =  NextAuth({
//   providers: [
//     {
//       id: "idcs",
//       type: "oauth",
//       name: "oracle",
//       async profile(profile) {
//         return {
//           id: profile.sub,
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//         };
//       },
//       wellKnown: 'https://idcs-1e0f415dd2bf423c8296ebb063528eca.identity.oraclecloud.com/.well-known/openid-configuration',
//       client: {
//         client_id: "b78f033d556e47bda9dc206a0830f14b",
//         client_secret: '0d5f753f-6618-4d51-ae96-f727afbced35',
//         redirect_uris: ['http://localhost:3000/callback'],
//         response_types: ['code'],
//         scope: ["openid, offline_access, email, profile"],
//         post_logout_redirect_uris: ['http://localhost:3000/'],
//         id_token_signed_response_alg: 'RS256',
//         default_max_age: 3600,
//         require_auth_time: true,
//         tls_client_certificate_bound_access_tokens: false,
//         request_object_signing_alg: 'RS256',
//         introspection_endpoint_auth_signing_alg: 'RS256',
//         revocation_endpoint_auth_signing_alg: 'RS256',
//         token_endpoint_auth_signing_alg: 'RS256',
//         userinfo_signed_response_alg: 'RS256',
//         authorization_signed_response_alg: 'RS256',
//       }
//     }
//   ],
// })

// next[custom.http_options] = customHttpOprtions;




