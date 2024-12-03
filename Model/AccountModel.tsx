import { GetAccount, GetAccountById } from "@/Utils/AccountAPI/AccountAPI";
import { GetAgency } from "@/Utils/AgencyAPI/AgencyAPI";
import { useEffect, useState } from "react";

export interface Account{
    id :string,
    phoneNumber:string,
    code:string
    agencyId:string
    agencyName:string,
    dob:string
    address:string
    gender:string

}
export const useAccount = (Token:string,id:string) => {
    const [Account, setAccount] = useState<Account>();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await GetAccount(Token, id); // Assuming you have token and id   
          // Iterate through each assignment notarization and fetch order details
  
          setAccount(data); // Update state with updated deadlines
        } catch (error) {
      
        }
      };
  
      fetchData();
    }, []);
  
    return Account;
  };
  export const useAccountPersonal = (Token:string,id:string) => {
    const [Account, setAccount] = useState<Account>();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await GetAccountById(Token, id); // Assuming you have token and id   
          // Iterate through each assignment notarization and fetch order details
         const agency = await GetAgency(Token,data.agencyId)
        //  const dateObject = new Date(data.dob)
        //  data.dob = dateObject.toLocaleDateString('vi-VN')
         data.agencyName = agency.name 
         
         setAccount(data); // Update state with updated deadlines
        } catch (error) {
      
        }
      };
  
      fetchData();
    }, []);
  
    return Account;
  };