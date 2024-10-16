import { router } from "expo-router";
import { client } from "../FetchAPIUtil";

export const GetShipList = async (token : string,id : string) =>{
    try {
        const response = await client.get('Shipping/GetByShipperId?id='+ id, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      if (response.status == 200)
      return response.data.data;
      if (response.status == 401) router.replace("/")
      } catch (error) {
        console.error('Error Calling:', error);
        return false;
      }
}