
import {createNativeStackNavigator} from "@react-navigation/native-stack"


import LoginScreen from "./LoginScreen";
const Stack=createNativeStackNavigator();
export default function RootLayout() {
  return (

    <Stack.Navigator >
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown : false}}/>
       
    </Stack.Navigator>
      );
}
