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
          }).then((response) =>{
            SetToken(response.data.token);
          }
        );
    }
   
    catch{
        console.log("Error");
    }
};