import { CreateQR } from "@/Utils/VNPayAPI/VNPayAPI";
import { useEffect, useState } from "react";

export interface VNPayModel{
    url:string
}
export const CreateQRCode = (Token:string,id:string,totalPrice:string) => {
    const [Account, setAccount] = useState<VNPayModel>();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await CreateQR(Token, id,totalPrice); // Assuming you have token and id   
          // Iterate through each assignment notarization and fetch order detail
          setAccount(data); // Update state with updated deadlines
        } catch (error) {
      
        }
      };
  
      fetchData();
    }, []);
  
    return Account;
  };