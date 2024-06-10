import axios from 'axios';
import { Methods } from '@/backend/entities/calls/http';
import { InternalError } from '@/backend/entities/internalError/error';
import { ErrorCode } from '@/backend/entities/internalError';
import qs from 'qs';

export async function validateToken(dni: string, password: string): Promise<any> {
    try {
        /* Set the axios config */
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

        console.log('axiosConfig', axiosConfig);

        let response = await axios.request(axiosConfig);

        if (response.status !== 200) {
            console.error('Error validate sign');
            return new InternalError("Error validate sign", ErrorCode.INTERNAL_SERVER_ERROR, response.data, response.status);
        }

        return response.data;

    } catch (error) {
        console.error('Error validate sign', error);
        return error;
    }
}
