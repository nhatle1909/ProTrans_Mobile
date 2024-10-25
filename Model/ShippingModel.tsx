import { useState, useEffect } from 'react';
import { GetShippings } from '@/Utils/ShippingAPI/ShippingAPI';
import { GetOrder } from '@/Utils/OrderAPI/OrderAPI';
export interface ShippingListModel{
     id: string;
shipperId: string;
orderId: string;
imageUrl: string;
status: string;
deadline:  string;
address: string;
code:string; // Adjust the type based on your API's response
}

export const useShippingTaskList = (Token:string,id:string) => {
  const [ShippingTaskList, setShippingTaskList] = useState<ShippingListModel[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetShippings(Token, id); // Assuming you have token and id
        setShippingTaskList(data); // Update state with initial data
        // Iterate through each assignment notarization and fetch order details
        const updatedData = await Promise.all(
          data.map(async (ShipTask) => {
            const order = await GetOrder(Token, ShipTask.orderId);       
            const orderIdCut = ShipTask.orderId.slice(0, 6).toUpperCase();
            const dateObject =  new Date(order.deadline);
            const formattedDeadline = dateObject.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
            return { ...ShipTask, deadline: formattedDeadline, code: orderIdCut,address :order.address }; // Merge data
          })
        );
        setShippingTaskList(updatedData); // Update state with updated deadlines
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return ShippingTaskList;
};