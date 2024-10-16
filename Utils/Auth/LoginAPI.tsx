import { client } from "../FetchAPIUtil";
import { SetToken } from "../TokenUtil";
export const LoginAPI = async (Email : string, Password : string) =>{
  try {
    const response = await client.post('Authentication/Login', {
      email: Email,
      password: Password,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
    });
    if (response.status === 200) {
      SetToken(response.data.token);
      return true;
    }
    
    if (response.status === 404) {
      return false;
    }
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
};
