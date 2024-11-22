import { router } from "expo-router";
import { client } from "../FetchAPIUtil";



export const GetNotification = async (token : string,id : string) =>{
    try {
        const response = await client.get('Notification/'+ id, {
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