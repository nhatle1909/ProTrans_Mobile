import { useState, useEffect } from 'react';
import { GetPickups, GetPrepareShips, GetShippings } from '@/Utils/ShippingAPI/ShippingAPI';
import { GetOrder } from '@/Utils/OrderAPI/OrderAPI';
import { GetAgency } from '@/Utils/AgencyAPI/AgencyAPI';
export interface ShippingListModel{
id: string;
shipperId: string;
orderId: string;
status: string;
//----------
deadline:  string;
address: string;
orderCode:string; 
}
export interface PrepareListModel{
  id: string;
shipperId: string;
orderId: string;
status: string;
deadline:string;
orderCode:string;
agencyName:string;
agencyaddress:string;
}
export const useShippingTaskList = (Token:string,id:string) => {
  const [ShippingTaskList, setShippingTaskList] = useState<ShippingListModel[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetShippings(Token, id); // Assuming you have token and id
   
        // Iterate through each assignment notarization and fetch order details
        const updatedData = await Promise.all(
          data.map(async (ShipTask) => {
            const order = await GetOrder(Token, ShipTask.orderId);       
        
            const dateObject =  new Date(order.deadline);
            const formattedDeadline = dateObject.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
            return { ...ShipTask, deadline: formattedDeadline,orderCode : order.orderCode, address :order.address }; // Merge data
          })
        );
        setShippingTaskList(updatedData); // Update state with updated deadlines
      } catch (error) {
      
      }
    };
    fetchData();
  }, []);
  return ShippingTaskList;
};
export const usePrepareShippingTaskList = (Token:string,id:string) => {
  const [ShippingTaskList, setShippingTaskList] = useState<PrepareListModel[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetPrepareShips(Token, id); // Assuming you have token and id
     
        const updatedData = await Promise.all(
          data.map(async (ShipTask) => {
            const order = await GetOrder(Token, ShipTask.orderId);       
            const agency = await GetAgency(Token,order.agencyId)
            const dateObject =  new Date(order.deadline);
            const formattedDeadline = dateObject.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
            return { ...ShipTask, deadline: formattedDeadline,orderCode : order.orderCode,agencyaddress :agency.address,agencyName:agency.name }; // Merge data
          })
        );
        setShippingTaskList(updatedData); // Update state with updated deadlines
      } catch (error) {
      
      }
    };
    fetchData();
  }, []);
  return ShippingTaskList;
};



export const usePickupList = (Token:string,id:string) => {
  const [ShippingTaskList, setShippingTaskList] = useState<ShippingListModel[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetPickups(Token, id); // Assuming you have token and id
       
        const updatedData = await Promise.all(
          data.map(async (ShipTask) => {
            const order = await GetOrder(Token, ShipTask.orderId);       
         
            const dateObject =  new Date(order.deadline);
            const formattedDeadline = dateObject.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
            return { ...ShipTask, deadline: formattedDeadline, orderCode : order.orderCode,address :order.address }; // Merge data
          })
        );
        setShippingTaskList(updatedData); // Update state with updated deadlines
      } catch (error) {
 
      }
    };
    fetchData();
  }, []);
  return ShippingTaskList;
};