import { router } from "expo-router";
import { client } from "../FetchAPIUtil";

export const GetShippings = async (token : string,id : string) =>{
    try {
        const response = await client.get('AssignmentShipping/GetShipByShipperId?id='+ id, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      if (response.status == 200)
      return response.data.data;
      if (response.status == 401) router.replace("/")
      } catch (error) {
        return false;
      }
}
export const GetPickups = async (token : string,id : string) =>{
  try {
      const response = await client.get('AssignmentShipping/GetPickUpByShipperId?id='+ id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    if (response.status == 200)
    return response.data.data;
    if (response.status == 401) router.replace("/")
    } catch (error) {
      return false;
    }
}