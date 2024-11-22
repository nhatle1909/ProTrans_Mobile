import { router } from "expo-router";
import { client } from "../FetchAPIUtil";

export const GetShippings = async (token : string,id : string) =>{
    try {
        const response = await client.get('AssignmentShipping/GetShippingShipByShipperId?id='+ id, {
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
export const GetPrepareShips = async (token : string,id : string) =>{
  
  try {
      const response = await client.get('AssignmentShipping/GetPrepareShipByShipperId?id='+ id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.data)
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
export const UpdateTaskStatusCompleted = async (token: string,id:string) => {
  try {
    const response = await client.put('AssignmentShipping/UpdateToCompleted?id='+ id, {
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
export const UpdateTaskStatusShipping = async (token: string,id:string) => {
  try {
    const response = await client.put('AssignmentShipping/UpdateToShipping?id='+ id, {
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