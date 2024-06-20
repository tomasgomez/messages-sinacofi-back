import axios from 'axios';
import {
  getEnvVariable
} from '../../utils/functions';

import {
  envVariables
} from '../../utils/variables';
import { User } from '@/backend/entities/user/user';

// get user by DNI
export async function getUser(dni: string): Promise<User | Error> {
  try {

    /* Get the URL and path from the environment variables */
    let url = getEnvVariable(envVariables.ADMIN_CLIENT_URL);
    if (url instanceof Error) {
      return url;
    }

    let path: string = "/api/user?dni=" + dni

    /* Get institution from an HTTP request */
    let response = await axios.get(`${url}${path}`);

    /* Check if the response status is not 200 */
    if (response.status !== 200 || response.data.length == 0) {
      console.error('Error fetching users:', response.statusText);
      return new Error(response.statusText);
    }

    const userAdated: User = {
      role: response.data[0].userGroup,
      name: response.data[0].publicName,
      institutionCode: response.data[0].institutionCode,
      area: response.data[0].areaCode,
      email: response.data[0].email,
      status: response.data[0].status,
      dni: dni,

    }

    return userAdated;

  } catch (error) {

    console.error('Error fetching users:', error);
    return new Error("Error fetching users")
  }
}