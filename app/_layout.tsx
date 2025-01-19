
import { Stack } from "expo-router";

export default function RootLayout(){

  return (
    
    <Stack >
        <Stack.Screen name="index"  options={{headerShown : false,animation:'fade',animationDuration:300,presentation:'transparentModal'}}/>
        <Stack.Screen name="(tabs)" options={{headerShown : false,animation:'fade',animationDuration:300}}/>
        <Stack.Screen name="MapShipping"  options={{headerShown : false,}}/>
        <Stack.Screen name="MapPickup"  options={{headerShown : false}}/>
        <Stack.Screen name="MapDocument"  options={{headerShown : false}}/>
        <Stack.Screen name="Camera" options={{headerShown:false}}/>
        <Stack.Screen name="Camera2" options={{headerShown:false}}/>
        <Stack.Screen name="NotarizationDetail" options={{headerShown:false,}}/>
        <Stack.Screen name="DocumentList" options={{headerShown:false,}}/>
        <Stack.Screen name="Payment" options={{headerShown:false}}/>
        <Stack.Screen name="Notification" options={{headerTitleAlign:'center',headerTitle:"Thông báo",headerStyle:{backgroundColor:'#fff'}}}/>
        <Stack.Screen name="Profile" options={{headerTitleAlign:'center',headerTitle:"Trang cá nhân",headerStyle:{backgroundColor:'#fff'}}}/>

        </Stack>
      );
}
