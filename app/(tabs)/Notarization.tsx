import { Text,View } from "@ant-design/react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomListItemNoti from "@/components/CustomItem/CustomItemListNotification";
import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { DecodeToken, GetToken } from "@/Utils/TokenUtil";
import { useAssignmentNotarizations } from "@/Model/AssignmentNotarizationModel";
import { router } from "expo-router";

import CustomListItem from "@/components/CustomItem/CustomItemList";
import Header from "@/components/Header";

export default function NotarizationTask(){

  const Token = GetToken();
  const DataToken = DecodeToken();
  const data = useAssignmentNotarizations(Token,DataToken.Id);
  const handleShippingPress = (id : string,address : string) =>{
    router.push({pathname:"/NotarizationDetail",params :{id: id,address :  address}})
  }

    if (data !== null) {
    return(
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
                  name={item.code}
                  deadline={item.deadline}
                  money=''
                  onPress={()=> {handleShippingPress(item.orderId,item.code)}} /> 
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
        <Header username={DataToken.Username} tabName = 'Danh sách công việc'></Header>
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
      height:'100%'
    },
    title:{
      fontWeight:'bold',
      fontSize:20,
      marginTop:20,
      alignSelf:'center',
      color:'#fff'
    }
    
  });