
import { router } from "expo-router";
import { client } from "../FetchAPIUtil";



export const CreateQR = async (token : string,id : string,totalprice : string) =>{
  console.log(id);
  console.log(totalprice)
  try {
      
        const response = await client.get('VNPay?shipperid=' + id + '&totalprice='+ totalprice, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      if (response.status == 200){
        const url = response.data.data;
      return url;
      }
      if (response.status == 401) router.replace("/")
      } catch (error) {
        console.error('Error Calling S:', error);
        return false;
      }
}
