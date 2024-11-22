
import { LinearGradient } from "expo-linear-gradient";
import {CustomListItemNoti} from "@/components/CustomItem/CustomItemListNotification";
import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { DecodeToken, GetToken } from "@/Utils/TokenUtil";
import { useNotification } from "@/Model/NotificationModel";


export default function NotarizationTask(){

   const Token= GetToken();
   const DataToken = DecodeToken();
   const data = useNotification(Token,DataToken.Id);
    return(
        <LinearGradient colors={['#40B59F', '#fff']}
        locations={[0.41, 1]} style={style.container}>
        <GestureHandlerRootView style={{ flex: 1 }}>
           
          <SafeAreaView style={style.itemContainer}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                  <CustomListItemNoti
                  author={item.author}
                    title={item.title}
                    message={item.title}
                    date={item.notificationTime}
                  />    
              )}
            />
          </SafeAreaView>
        </GestureHandlerRootView>
        </LinearGradient>
    )
}
const style = StyleSheet.create({
    container:{
      flex:1,
    
    },
    taskList :{
      borderRadius:10,
      borderWidth:1,
      width:'90%',
      height:40,
      alignSelf:'center',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      backgroundColor:'#fff'
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
      marginTop:'5%',
      backgroundColor:'#fff',
      height:'90%'
    },
    taskListText:{
      marginLeft:10
    },
    btn:{
      marginRight:10,
    }
  });