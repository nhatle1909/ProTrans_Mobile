import { router } from "expo-router";
import { client } from "../FetchAPIUtil";
import { Alert } from "react-native";

export const CreateTransaction = async (token:string, id:string, orderId:string) => {
  try {
    const response = await client.put('Transaction', 
      { 
        accountId: id, 
        orderId: orderId 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );

    if (response.status === 200) {
      return true;
    }
    if (response.status === 401) {
      router.replace("/");
      return false;
    }
    return false;
  } catch (error) {
    console.error('Error Creating Transaction:', error);
    return false;
  }
}