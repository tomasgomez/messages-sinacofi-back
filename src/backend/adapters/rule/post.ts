import axios from 'axios';
import { Methods } from '../../entities/calls/http';
import { InternalError } from '../../entities/internalError/error';
import { ErrorCode } from '@/backend/entities/internalError';

export async function post(url: string, path: string, headers?: any, body?: any): Promise<any> {
    try {
        /* If headers or body are not defined, set them to empty objects */
        if (headers === undefined) {
            headers = {};
        }
        if (body === undefined) {
            body = {};
        }

        /* Set the axios config */
        const axiosConfig = {
            method: Methods.POST,
            url: `${url}${path}`,
            headers: headers,
            data: body
        };

        let response = await axios.request(axiosConfig);

        if (response.status !== 200) {
            console.error('Error fetching message:', response.statusText);
            return new InternalError("Error fetching message", ErrorCode.INTERNAL_SERVER_ERROR, response.data, response.status);
        }

        return response.data;

    } catch (error) {
        console.error('Error fetching message:', error);
        return error;
    }
}
