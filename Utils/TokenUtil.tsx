import * as SecureStore from 'expo-secure-store'
import { jwtDecode } from "jwt-decode";
import { router } from 'expo-router';
export const SetToken = async (token : string) => {
    try {
        await SecureStore.setItem('jwt',token);
    }catch(error){
        console.log("Error store JWT", error);
    }
};
export const GetToken = () => {
    try {
        
        let token = SecureStore.getItem('jwt');
        
        if (token) {
            return token.toString();
          } else {
            console.log('No JWT Found');
            router.replace("/")
            return ''; // Return an empty string instead of undefined
          }
        } catch (error) {
          console.error('Error retrieving JWT', error);
          return ''; // Return an empty string in case of error
        }
}
export const RemoveToken = async() => {
        const token = await SecureStore.getItemAsync('jwt');
        if (token){
            await SecureStore.deleteItemAsync('jwt');
        }
        else {
            console.error("No JWT Token");
        }
}
export const DecodeToken =() => {
    try {       
        const Token = GetToken();
        const data = jwtDecode(Token || "");
        return data;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  };
