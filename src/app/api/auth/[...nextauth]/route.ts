import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { Methods } from '@/backend/entities/calls/http';
import NextAuth, { NextAuthOptions } from 'next-auth';

// import { errorHandler } from '@/backend/utils/errorHandler'

// import calls
// import { messageForeclosureCalls } from '@/backend/handler/foreclosure/handler';

/*
Message Detail API
*/
// OAuthProvider.openid({})

const clientId = '170d6a37e12c41e789c3fac3ceca653f';
const clientSecret = 'beb6a6c4-8d38-46a4-a3fe-167c3f6b2fe0';
const redirectUri = 'http://localhost:3000/callback';


const authOptions: NextAuthOptions = {
  providers: [
    {  
      id: "oci",
      name: "oci",
      type: "oauth",
      wellKnown: "https://idcs-1e0f415dd2bf423c8296ebb063528eca.identity.oraclecloud.com/.well-known/idcs-configuration",
      authorization: { 
        params: { 
          scope: "openid profile email groups",
          redirect_uri: 'http://localhost:3000/callback',
          client_id: '170d6a37e12c41e789c3fac3ceca653f',
          client_secret: 'beb6a6c4-8d38-46a4-a3fe-167c3f6b2fe0',
          code_verifier: 'codeVerifier',
          grant_type: 'refresh_token',
        } 
      },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    },
  ],
  secret: clientSecret,
  callbacks: {
      // async jwt({ token, account }) {
      //     return token
      // },
      async session({ session, token, user }) {
          return session
      },
  },
}


const handler = NextAuth(authOptions);
// async function handler(req: NextApiRequest, res: NextApiResponse < any > ) {
//   console.log('# Auth')
  
//   return Response.json({})
// }

export { handler as GET }