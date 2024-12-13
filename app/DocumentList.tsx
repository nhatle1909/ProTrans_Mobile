import React  from 'react';
import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Header} from '@/components/Header';
import { router, useLocalSearchParams} from 'expo-router';
import { DecodeToken, GetToken } from '@/Utils/TokenUtil';
import { useDocumentList } from '@/Model/DocumentModel';
import {CustomListDocument} from '@/components/CustomItem/CustomItemDocument';
import { UpdateTaskStatusCompleted } from '@/Utils/ShippingAPI/ShippingAPI';
import { PostNotificationPickup } from '@/Utils/NotificationAPI/NotificationAPI';

export default function NotarizationTask() {
  const Token = GetToken();
  const Data = useLocalSearchParams();
  const DataToken = DecodeToken();
  const data = useDocumentList(Token,Data.taskId);
  const handleShippingPress = (id : string) =>{
    router.push({pathname:"/Camera2",params :{ImageShippingid: id,orderId : Data.orderId,taskId:Data.taskId}})
  }
  const NavigateBack = async () => {
    await UpdateTaskStatusCompleted(Token,Data.taskId.toString())
    await PostNotificationPickup(Token,"ce5bac33-050a-4f1a-a3e6-7e1f84e25d48",DataToken.Username,Data.orderCode)
    router.replace("/(tabs)/Notarization")
  }
  if (data !== null){
  return (
    <LinearGradient colors={['#40B59F', '#fff']}
    locations={[0.41, 1]} style={style.container}>
      <Header username={DataToken.Username} tabName = 'D'></Header>
    <GestureHandlerRootView >
     <SafeAreaView style={style.itemContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (       
              <CustomListDocument
                code={item.document.code}
                lan1={item.document.firstLanguage}
                lan2={item.document.secondLanguage}
                pageNumber={item.document.pageNumber}
                onPress={()=>{handleShippingPress(item.id)}} /> 
              )}
      />
      </SafeAreaView>
    </GestureHandlerRootView> 
    </LinearGradient>
  );
}
else {
  return( NavigateBack())
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