import axios, { AxiosError } from 'axios';
import { Methods } from '@/backend/entities/calls/http';
import qs from 'qs';
import { TokenInvalidError } from '@/backend/exceptions/validateSign/TokenInvalidError';

export async function validateTokenIamOracle(dni: string, password: string): Promise<void> {
    /* Set the axios config */
    try{
        const axiosConfig = {
            method: Methods.POST,
            url: process.env.IAM_VALIDATE_TOKEN_URL,
            headers:  {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Accept': 'application/json'
            },
            data: qs.stringify({
                'grant_type': 'password',
                'username': dni,
                'password': password,
                'scope': 'urn:opc:idm:__myscopes__',
                'client_id': process.env.IAM_CLIENT_ID,
                'client_secret': process.env.IAM_CLIENT_SECRET
            })
        };
    
        const response = await axios.request(axiosConfig);
    
        if (response.status !== 200) {
            throw new TokenInvalidError("Error validate sign");
        }
    }catch(error: any | AxiosError){
        throw new TokenInvalidError(`${error.response?.data.error_description || 'Error validate sign'}`);
    }
}
