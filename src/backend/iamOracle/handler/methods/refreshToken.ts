import axios from "axios";
import { getIDCSURL, Idcs } from "../../entities/idcs";
import qs from "qs";


export const refreshToken = async (idcs: Idcs,refreshToken: string): Promise<any | Error> => {
    try {
        // get the url
        const url = getIDCSURL(idcs, false, 'userinfoEndpoint');
        if (url instanceof Error){
            console.log(url);
            return url;
        }
        const tokenResponse = await axios.post(url, qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: process.env.IAM_CLIENT_ID || '',
            client_secret: process.env.IAM_CLIENT_SECRET || '',
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