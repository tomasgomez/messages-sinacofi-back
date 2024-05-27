import axios from 'axios';
import {
  getEnvVariable
} from '../../utils/functions';

import {
  envVariables
} from '../../utils/variables';

// get message function return any
export async function getInstitutions() {
  try {

    /* Get the URL and path from the environment variables */
    let url = getEnvVariable(envVariables.ADMIN_CLIENT_URL);
    if (url instanceof Error) {
      return url;
    }

    /* Get the path from the environment variables */
    let path = getEnvVariable(envVariables.INSTITUTIONS_PATH);
    if (path instanceof Error) {
      return path;
    }

    /* Get institution from an HTTP request */
    let response = await axios.get(`${url}${path}`);

    /* Check if the response status is not 200 */
    if (response.status !== 200) {
      console.error('Error fetching message:', response.statusText);
      return new Error(response.statusText);
    }

    return response.data;

  } catch (error) {

    console.error('Error fetching message:', error);
    return;
  }
}