import { GetOrder } from "@/Utils/OrderAPI/OrderAPI";
import { useEffect, useState } from "react";

export interface Order {
    id : string;
    fullName:string;
    phoneNumber:string;
    address:string;
    deadline:string;
    status:string;
    totalPrice:number;
}
export const GetOrderData= (Token:string,id:string)=>{
    const [Order,SetOrder] = useState<Order>();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await GetOrder(Token, id); // Assuming you have token and id
            SetOrder(data); // Update state with initial data
            // Iterate through each assignment notarization and fetch order 
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);
    return Order;
}