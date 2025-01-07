import React, { useEffect, useState } from 'react';

import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Header} from '@/components/Header';

import { router} from 'expo-router';
import { DecodeToken, GetToken } from '@/Utils/TokenUtil';

import { useAssignmentNotarizations } from '@/Model/AssignmentNotarizationModel';
import { CustomListNotarize } from '@/components/CustomItem/CustomItemNotarize';
import Toast from 'react-native-toast-message';
import { HubConnectionBuilder } from '@microsoft/signalr';

export default function NotarizationTask2() {
  const Token = GetToken();
  const DataToken = DecodeToken();
  const data = useAssignmentNotarizations(Token,DataToken.Id);

  const hubConnection = new HubConnectionBuilder()
  .withUrl('https://protrans.azurewebsites.net/notificationHub')
  .withAutomaticReconnect()
  .build();
  useEffect(() => {
    const startConnection = async () => {
        try {
          hubConnection.on(`${DataToken.Id}`, async (title,message,author) => {
            
            Toast.show({

              type: 'success', // You can use 'success', 'error', 'info'
        
              text1: `${title}`,
        
              text2: `${message}`,
              
              text1Style:{fontSize:13,marginTop:-10,color:'#40B59F'},
              text2Style:{fontSize:12,flexWrap:'wrap'},
              position: 'top',
        
              topOffset: 20,
        
              visibilityTime: 3000, // Toast will disappear after 3 seconds
        
            });
            // Handle the notification here, e.g., display a notification, update UI, etc.
        });
            hubConnection.start()
            .then(() => console.log('Connected'))
             .catch(error => console.error(error));

            // Subscribe to a specific method
          
        } catch (error) {
            console.error('Error connecting to SignalR Hub:', error);
        }
    };

    startConnection();
    return () => {
        console.log("Stopped")
        hubConnection.stop();
    };
}, []);
    const handleShippingPress = (id : string,address : string,fakecode:string) =>{
      router.push({pathname:"/NotarizationDetail",params :{id: id,address:  address,fakecode:fakecode}})
    }

    if (data === undefined){
      return (
        <LinearGradient colors={['#40B59F', '#fff']}
      locations={[0.41, 1]} style={style.container}>
        <Header username={DataToken.Username} tabName = 'Danh sách đơn hàng cần giao'></Header>
        <Toast></Toast>
        <Text style={[style.title,{fontFamily:'Quicksand'}]}>Đang tải dữ liệu</Text>
        </LinearGradient>
      ) 
    } else {

  return (
    <LinearGradient colors={['#40B59F', '#fff']}
    locations={[0.41, 1]} style={style.container}>
      <Header username={DataToken.Username} tabName = 'Danh sách tài liệu cần nhận'></Header>
      <Toast></Toast>
    <GestureHandlerRootView >
  
     <SafeAreaView style={style.itemContainer}>
     {data !== undefined && (
       <>{
          data !== null? 
          (
          <>
            <Text style={[style.title1,{fontFamily:'Quicksand'}]}>Đơn hàng cần công chứng</Text>
            <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (       
                <CustomListNotarize
                id={item.fakecode}
                  status={item.status}
                  deadline={item.deadline}
                  onPress={()=> {handleShippingPress(item.id,item.status,item.fakecode)}} /> 
                )}
            />          
          </>
          )
        : 
          (
            <Text style={[style.title1,{fontFamily:'Quicksand'}]}>Hiện không có công việc</Text>
          )
        }
      </>
    )}
      </SafeAreaView>
    </GestureHandlerRootView> 
    </LinearGradient>
  );
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
  },  title1:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',
    padding:5,
    marginBottom:5
  }
});