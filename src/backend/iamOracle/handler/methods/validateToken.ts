import { getIDCSURL, Idcs } from "../../entities/idcs";
import { jwtVerify, createRemoteJWKSet, JWTPayload } from 'jose';

export const validateToken = async (idcs: Idcs, token: string): Promise<JWTPayload | Error> => {
  try {
    // get url
    const url = getIDCSURL(idcs, false, 'jwksUri');
    if (url instanceof Error) {
      console.log(url);
      return url;
    }

    // create remote JWK set
    const JWKS = createRemoteJWKSet(new URL(url));

    // verify token
    const { payload } = await jwtVerify(token, JWKS, {
      algorithms: ['RS256'],
    });

    return payload;

  } catch (error) {
    console.log(error);
    return new Error(String(error));
  }
};
