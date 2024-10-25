import Header from "@/components/Header";
import { background } from "@/constants/Image";
import { DecodeToken, GetToken } from "@/Utils/TokenUtil";
import { Form, Text,View, WhiteSpace, } from "@ant-design/react-native";
import Input from "@ant-design/react-native/lib/input-item/Input";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

export default function MainScreen(){
const data = DecodeToken();
console.log(data)
const [username,SetUsername] = useState(data.Username);
const email = data.Email;
  return (
    <LinearGradient colors={['#79D2A0', '#3E6C52']}
    locations={[0.41, 1]} style={Style.background}>
    
    <Header username={data.Username} tabName = 'Thông tin cá nhân'></Header>

  <GestureHandlerRootView style={Style.container}>
    <ScrollView>
      
    <Form  style = {Style.ProfileForm}>
      <View style={Style.ProfilePanel}>
        <View>
      <Input style={Style.Input}
      editable={false}
           value={email}
      >
      </Input>
      </View>
      
      <View>
      <Input style={Style.Input}
      
      value={username}
      onChangeText={SetUsername}>
      </Input>
      </View>
      </View>
    </Form>

    
    </ScrollView>
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
  ProfilePanel:{
    width:"100%",
    height:'auto',
    flex:1,
    alignItems:'flex-start'
  },
  ProfileForm:{
    width: '90%',
    padding:15,
    marginTop:15,
    marginHorizontal:'5%',
    borderRadius:5,
    flex:1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  Input:{
    height:40,
    width:'100%',
    fontSize:17,
    paddingLeft:15,
    marginBottom:15,
    borderWidth:1,
    borderRadius:10,
    backgroundColor:'#fff'
  }
})