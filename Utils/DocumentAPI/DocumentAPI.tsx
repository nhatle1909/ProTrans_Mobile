import { router } from "expo-router";
import { client } from "../FetchAPIUtil";

export const GetDocuments = async (token : string,id : string) =>{
    try {

        const response = await client.get('ImageShipping/GetByAssignmentShippingId?id='+ id, {
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
export const GetDocuments2 = async (token : string,id : string) =>{
  try {

      const response = await client.get('NotarizationDetail/'+ id, {
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
export const GetDocument = async (token : string,id : string) =>{
  try {

      const response = await client.get('Document/'+ id, {
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