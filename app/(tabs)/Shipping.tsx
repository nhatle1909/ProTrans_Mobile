import React, {  useState }  from 'react';
import {CustomListItem} from "@/components/CustomItem/CustomItemList";
import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Header} from '@/components/Header';
import { useShippingTaskList } from '../../Model/ShippingModel';
import { router} from 'expo-router';
import { DecodeToken, GetToken } from '@/Utils/TokenUtil';

export default function NotarizationTask() {
  const Token = GetToken();
  const DataToken = DecodeToken();
  const data = useShippingTaskList(Token,DataToken.Id);
  const handleShippingPress = (id : string,orderId : string,address : string) =>{
 
    router.push({pathname:"/Map",params :{taskId : id,orderId: orderId,address :  address, type:'Ship'}})
  }
  if (data !== null){
  return (
    <LinearGradient colors={['#40B59F', '#fff']}
    locations={[0.41, 1]} style={style.container}>
      <Header username={DataToken.Username} tabName = 'Danh sách công việc'></Header>
    <GestureHandlerRootView >
     <SafeAreaView style={style.itemContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (       
              <CustomListItem
                name={item.address}
                deadline={item.deadline}
                money={item.code}
                onPress={()=> {handleShippingPress(item.id,item.orderId,item.address)}} /> 
              )}
      />
      </SafeAreaView>
    </GestureHandlerRootView> 
    </LinearGradient>
  );
}
else {
  return (
    <LinearGradient colors={['#40B59F', '#fff']}
  locations={[0.41, 1]} style={style.container}>
    <Header username={DataToken.Username} tabName = 'Danh sách đơn hàng cần giao'></Header>
    <Text style={style.title}>Hiện không có công việc</Text>
    </LinearGradient>
  ) 
}
}
const style = StyleSheet.create({
  container:{
    flex:1
  },
  itemContainer:{
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    width:'85%',
    alignSelf:'center',
    marginTop:15,
    backgroundColor:'#fff',
    height:'85%'
  },
  title:{
    fontWeight:'bold',
    fontSize:20,
    marginTop:20,
    alignSelf:'center',
    color:'#fff'
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  button:{
    flex: 1,
    backgroundColor: '#f0f0f0',
  
    marginHorizontal:5,
    alignItems: 'center',
  },
  text:{
    fontSize:20,
    textAlign:'center',
    marginTop:5
  }
});