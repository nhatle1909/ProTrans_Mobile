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

export const PostNotification = async (token : string,id : string,username:string,orderCode:string) =>{
  
  try {
      const response = await client.post('Notification', 
        {
          specId : id,
          title : "Hoàn thành đơn hàng",
          message : `Shipper ${username} đã hoàn thành đơn hàng với mã vận đơn là ${orderCode}`,
          author:username
        },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
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

export const PostNotificationNota = async (token : string,id : string,username:string,fakecode:string) =>{
  
  try {
      const response = await client.post('Notification', 
        {
          specId : id,
          title : "Hoàn thành đơn hàng",
          message : `Shipper ${username} đã hoàn thành công chứng đơn hàng với mã công việc là ${fakecode}`,
          author:username
        },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
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
export const PostNotificationPickup = async (token : string,id : string,username:string,fakecode:string) =>{
  
  try {
      const response = await client.post('Notification', 
        {
          specId : id,
          title : "Hoàn thành đơn hàng",
          message : `Shipper ${username} đã hoàn thành nhận các tài liệu thuộc đơn hàng ${fakecode}`,
          author:username
        },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
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