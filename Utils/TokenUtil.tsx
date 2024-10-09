import * as SecureStore from 'expo-secure-store'

export const SetToken = async (token : string) => {
    try {
        await SecureStore.setItemAsync('jwt',token);
    }catch(error){
        console.log("Error store JWT", error);
    }
};
export const GetToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('jwt');
    
    if (token){
        console.log("JWT retrieved successfully",token);
    }else console.log('No JWT Found');
    return token;
    }catch(error) {
        console.error('Error retrieving JWT', error);
      }
}