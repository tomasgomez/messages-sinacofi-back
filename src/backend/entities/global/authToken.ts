import 'next-auth/jwt'
import { DefaultJWT } from "next-auth/jwt";

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT{
    name?: string;
    sub?: string;
    id: string;
    dni?: string;
    idToken?: string;
    refreshToken?: string;
    accessToken?: string;
    iat?: string;
    exp?: string;
    jto?: string;
  }
}
