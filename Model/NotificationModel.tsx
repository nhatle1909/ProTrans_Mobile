
import { GetNotification } from "@/Utils/NotificationAPI/NotificationAPI";
import { useEffect, useState } from "react"

export interface Notification {
    id:string,
    title:string,
    message:string,
    author:string,
    notificationTime:string
}
export const useNotification = (Token:string,id:string) =>{
 const [Notification,setNotification] = useState<Notification[]>([]);

 useEffect(() => {
    const fetchData = async () => {
        try {
          const data = await GetNotification(Token, id); // Assuming you have token and id
      
         
           const updatedData = await Promise.all(
              data.map(async (Notification) => {
              
                const dateObject =  new Date(Notification.notificationTime);
                const formattedDeadline = dateObject.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
                return { ...Notification, notificationTime: formattedDeadline }; // Merge data
              })
            );
            setNotification(updatedData); 
        }catch (error) {
    
        }
      };
  
      fetchData();
 },[])
 return Notification;
}