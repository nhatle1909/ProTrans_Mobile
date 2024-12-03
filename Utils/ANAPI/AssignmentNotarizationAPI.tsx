import { router } from "expo-router";
import { client } from "../FetchAPIUtil";

export const GetAssignmentNotarizations = async (token : string,id : string) =>{
    try {
        const response = await client.get('AssignmentNotarization/'+ id, {
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
export const UpdateAssignmentNotarizationStatus = async(token:string,id:string) =>{
  try {
    const response = await client.put('AssignmentNotarization/Notarize?id='+ id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  if (response.status == 200)
  return response.data.data;
  if (response.status == 401) router.replace("/")
  } catch (error) {
    console.error('Error Calling: Nota', error);
    return false;
  }
}
export const UpdateDocumentStatusNotarization = async(token:string,id:string) => {
  try {
    const response = await client.put('NotarizationDetail/'+ id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  if (response.status == 200)
  return response.data.data;
  if (response.status == 401) router.replace("/")
  } catch (error) {
    console.error('Error Calling: Nota', error);
    return false;
  }
}