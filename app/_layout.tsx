
import { GetToken } from "@/Utils/TokenUtil";
import { Stack } from "expo-router";

export function RootLayout(){

  return (
    
    <Stack >
        <Stack.Screen name="index"  options={{headerShown : false,animation:'fade_from_bottom',animationDuration:300}}/>
        <Stack.Screen name="(tabs)" options={{headerShown : false}}/>
        <Stack.Screen name="Map"  options={{headerShown : false}}/>
        <Stack.Screen name="Camera" options={{headerShown:false}}/>
        <Stack.Screen name="NotarizationDetail" options={{headerShown:false}}/>
        <Stack.Screen name="Payment" options={{headerShown:false}}/>
        <Stack.Screen name="Notification" options={{headerShown:false}}/>
        </Stack>
      );
}
