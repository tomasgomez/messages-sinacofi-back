import axios from "axios";
import { getIDCSURL, Idcs } from "../../entities/idcs";
import { jwtVerify, JWTPayload, createLocalJWKSet, JWK } from 'jose';

interface IdcsConfig {
    IDCSHost: string;
    AudienceServiceUrl: string;
    TokenIssuer: string;
}

export const validateToken = async (idcs: Idcs, token: string): Promise<JWTPayload | Error> => {
    try {
        // Get URL
        const url = getIDCSURL(idcs, false, 'jwksUri');
        if (url instanceof Error) {
            console.log(url);
            return url;
        }

       // get jwks
       const jwksResponse = await axios.get(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+ token
        }
       })
       
       const jwksUpdated = {
            keys: mapOracleResponseToJWK(jwksResponse.data)
       }
       const jwksLocal = createLocalJWKSet(jwksUpdated);
        // Verify token
        const { payload } = await jwtVerify(token, jwksLocal, {
            algorithms: ['RS256'],
        });
        return payload;

    } catch (error) {
        console.log("errorcito");
        return new Error(String(error));
    }
};

function mapOracleResponseToJWK(response: any): JWK[] {
    return response.keys.map((key: any) => {
      // RS256 just needs verify ops
      let keyOps = key.key_ops;
      if (key.alg === "RS256") {
        keyOps = ["verify"];
      }
      key.key_ops = keyOps;
      return key as JWK;
    });
  }
  
