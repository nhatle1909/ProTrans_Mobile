import { Text,View } from "@ant-design/react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomListItemNoti from "@/components/CustomItem/CustomItemListNotification";
import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { GetToken } from "@/Utils/TokenUtil";

export default function NotarizationTask(){

    const data = [
        {
          id: '1',
          name: 'CSX-5392',
          deadline: '2024-10-15 5:00 PM',
        },
        {
            id: '21',
            name: 'CSX-5392',
            deadline: '2024-10-15 5:00 PM',
          },
          {
            id: '3',
            name: 'CSX-5392',
            deadline: '2024-10-15 5:00 PM',
          },
          {
            id: '4',
            name: 'CSX-5392',
            deadline: '2024-11-15 5:00 PM',
          }
        
      ];
    return(
        <LinearGradient colors={['#79D2A0', '#3E6C52']}
        locations={[0.41, 1]} style={style.container}>
        <GestureHandlerRootView style={{ flex: 1 }}>
           
          <SafeAreaView>
           
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                  <CustomListItemNoti
                    title={item.name}
                    message="TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEETTTTTTTTTTTTTTTTTTTTTTTT"
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
      flex:1
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
    taskListText:{
      marginLeft:10
    },
    btn:{
      marginRight:10,
    }
  });