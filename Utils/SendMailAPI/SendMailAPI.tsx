import { router } from "expo-router";
import { client } from "../FetchAPIUtil";

export const SendMail = async(token:string,orderId:string,shipperName:string,shipperPhone:string,customerEmail:string) =>{
    try {
        const response = await client.post('SendMail/SendBill?orderId='+orderId+'&shipperName='+shipperName+'&shipperPhone='+shipperPhone, 
          {
            to : customerEmail,
            subject : "Hoàn thành đơn hàng - Hóa đơn",
            body: `string`,
            imageUrl : "s"
          },
          {
          headers: {
            Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
          }
        });
    
      if (response.status == 200)
       console.log(response.data.data)

      if (response.status == 401) router.replace("/")
      } catch (error) {
        console.error('Error Calling Send:', error);
        return false;
      }
}