import { router } from "expo-router";
import { client } from "../FetchAPIUtil";



export const GetAccount = async (token : string,id : string) =>{
    try {
        const response = await client.get('Account/GetByPhoneNumber?phoneNumber='+ id, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      if (response.status == 200)
      return response.data.data;
      if (response.status == 401) router.replace("/")
      } catch (error) {
        console.error('Error Calling Account:', error);
        return false;
      }
}
export const GetAccountById = async (token : string,id : string) =>{
  try {
      const response = await client.get('Account/'+ id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    if (response.status == 200)
    return response.data.data;
    if (response.status == 401) router.replace("/")
    } catch (error) {
      console.error('Error Calling Account:', error);
      return false;
    }
}