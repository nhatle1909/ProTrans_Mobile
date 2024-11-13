import {Header} from "@/components/Header";
import { DecodeToken, GetToken } from "@/Utils/TokenUtil";
import { Button, Text,View } from "@ant-design/react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView,Switch } from "react-native-gesture-handler";
export default function MainScreen(){
const Token = GetToken();
const data = DecodeToken();
const Data = useLocalSearchParams();
const [isEnabled, setIsEnabled] = useState(false);
const [PaymentMethod,setPaymentMethod] = useState("Tiền mặt")
const toggleSwitch = () => {
  setIsEnabled(!isEnabled);
  if (isEnabled) setPaymentMethod("Tiền mặt")
  if (!isEnabled) setPaymentMethod("Chuyển qua VNPay")  
};
const navigate = () => {
    router.replace({pathname:"/Camera",params:{taskId:Data.taskId,orderId:Data.orderId}})
}
  return (
    <LinearGradient colors={['#40B59F', '#fff']}
    locations={[0.41, 1]} style={Style.background}>
    
    <Header username={data.Username} tabName = 'Thông tin cá nhân'></Header>
<GestureHandlerRootView>
    <View style={Style.paymentmethod}>
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#fff" : "#000"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}   
        style={Style.switch}
      />
      <Text style={Style.text}>{PaymentMethod}</Text>
      <Button onPress={navigate}></Button>
      </View>
      </GestureHandlerRootView>
   </LinearGradient>
)
}
const Style = StyleSheet.create({
  background:{
    flex:1
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
 switch:{
    alignSelf:'flex-start',
  
    transform:[{scale:1.5}]

 },
 paymentmethod:{
    flex:1,
    flexDirection:'row',
    marginLeft:'7%',
    marginTop:'5%',
 },
 text:{
    color:'#fff',
    fontWeight:'bold',
    marginTop:10,
    fontSize:19,
    marginLeft:20.
 }
})