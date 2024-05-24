import axios from "axios";
import { getIDCSURL, Idcs } from "../../entities/idcs";
import qs from "qs";

export const authCode = async (idcs: Idcs,code: string, codeChallenge: string): Promise<any | Error> => {
    try {
        // get the url
        const url = getIDCSURL(idcs, false, 'tokenEndpoint');
        if (url instanceof Error){
            console.log(url);
            return url;
        }
        const tokenResponse = await axios.post(url, qs.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.IAM_REDIRECT_URL || '',
                client_id: process.env.IAM_CLIENT_ID || '',
                client_secret: process.env.IAM_CLIENT_SECRET || '',
                code_verifier: codeChallenge,
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
        return tokenResponse.data;
    }catch (error){
        console.log(error);
        return error;
    }
}