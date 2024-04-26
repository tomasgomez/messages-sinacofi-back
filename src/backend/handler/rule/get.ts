import axios from 'axios';
import { getEnvVariable } from '../../utils/functions';
import { envVariables } from '../../utils/variables';
import { Methods } from '../../entities/calls/http';
import { InternalError } from '../../entities/internalError/error';
import { ErrorCode } from '@/backend/entities/internalError';
import { ruleTypes } from '@/pages/api/rule';

export async function getSchemaTypes(headers?: any, body?: any): Promise<any> {
    try {
        // const url = getEnvVariable(envVariables.RULE_CLIENT_URL);
        // if (url instanceof Error) {
        //     return url;
        // }

        // const path = getEnvVariable(envVariables.SCHEMA_PATH);
        // if (path instanceof Error) {
        //     return path;
        // }

        // if (headers === undefined) {
        //     headers = {};
        // }

        // if (body === undefined) {
        //     body = {};
        // }

        // const axiosConfig = {
        //     method: Methods.GET,
        //     url: `${url}${path}`,
        //     headers: headers,
        //     data: body
        // };

        // let response = await axios.request(axiosConfig);

        // if (response.status !== 200) {
        //     console.error('Error fetching message:', response.statusText);
        //     return new InternalError("Error fetching message", ErrorCode.INTERNAL_SERVER_ERROR, response.data, response.status);
        // }

        // return response.data;
        return ruleTypes;

    } catch (error) {
        console.error('Error fetching message:', error);
        return error;
    }
}
