
import { GetToken } from "@/Utils/TokenUtil";
import { router, Stack } from "expo-router";

export function RootLayout(){
  return (
    
    <Stack initialRouteName="index" >
        <Stack.Screen name="index"  options={{headerShown : false}}/>
        <Stack.Screen name="(tabs)" options={{headerShown : false}}/>
    </Stack>
      );
}
