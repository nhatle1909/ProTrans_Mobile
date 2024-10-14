
import { GetToken } from "@/Utils/TokenUtil";
import { Stack } from "expo-router";
export function BottomTabLayout(){
  return (
    
    <Stack initialRouteName="index" >
        <Stack.Screen name="index"  options={{headerShown : false}}/>
        <Stack.Screen name="(tabs)" options={{headerShown : false}}/>
    </Stack>
      );
}
