import AntDesign from "@ant-design/icons-react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Foundation from '@expo/vector-icons/Foundation';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Tabs } from "expo-router"

export default () => {
  return (

    <Tabs initialRouteName="Dashboard"  screenOptions={{tabBarShowLabel:false, tabBarInactiveBackgroundColor:'#fff',tabBarActiveTintColor:'#000'}} >
        <Tabs.Screen name="Dashboard" options={{
          title: 'Dashboard',          
          tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={25} color="#1CE238"/>
        }}/>
      
        <Tabs.Screen name="Shipping"  options={{
          title: 'Shipping Task List',          
          tabBarIcon: ({ color }) => <MaterialIcons name="local-shipping" size={25} color="#1CE238"/>
        }}/>
          <Tabs.Screen name="Notarization" options={{        
          tabBarIcon: ({ color }) => <Ionicons name="notifications" size={25} color="#1CE238"/>
        }}/>
    </Tabs>
      );
}