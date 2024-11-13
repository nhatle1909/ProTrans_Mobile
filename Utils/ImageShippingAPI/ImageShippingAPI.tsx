import { router } from "expo-router";
import { client } from "../FetchAPIUtil";

export const UpdateURL = async (token : string,id : string,url : string) =>{
    try {
        
        const response = await client.put('ImageShipping/UpdateImage?id='+ id+'&urlPath='+url, {
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
export const getImageShippingId = async (token : string, id:string) => {
  try {
        
    const response = await client.get('ImageShipping/GetByAssignmentShippingId?id=' + id, {
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