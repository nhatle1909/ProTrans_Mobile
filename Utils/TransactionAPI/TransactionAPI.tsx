import { router } from "expo-router";
import { client } from "../FetchAPIUtil";


export const CreateTransaction = async (token : string,id : string,orderId:string) =>{
    try {
        const response = await client.post('Account/GetByPhoneNumber?phoneNumber='+ id, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      if (response.status == 200)
      return response.data.data;
      if (response.status == 401) router.replace("/")
      } catch (error) {
        console.error('Error Calling D:', error);
        return false;
      }
}