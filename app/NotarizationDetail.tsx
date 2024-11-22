import { CustomListDocumentNotarize } from "@/components/CustomItem/CustomItemNotarizationDetail";
import {Header} from "@/components/Header";
import { NotarizationDetail, useDocumentList2 } from "@/Model/NotarizationDetailModel";
import { UpdateAssignmentNotarizationStatus } from "@/Utils/ANAPI/AssignmentNotarizationAPI";
import { DecodeToken, GetToken } from "@/Utils/TokenUtil"
import { Button, View } from "@ant-design/react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotarizationDetail2(){
    const data = DecodeToken();
    const token = GetToken();
    const item = useLocalSearchParams();
    
    const [documentList,setDocumentList] = useState<NotarizationDetail[]>([]); // Use a state variable to store received data
  console.log(item.id)
  const fetchedDocumentList = useDocumentList2(token, item.id);

  useEffect(() => {
    // Update documentList state when fetched data changes
    setDocumentList(fetchedDocumentList);
  }, [fetchedDocumentList]);
console.log(documentList)
    const FinishTask=async()=>{ 
      UpdateAssignmentNotarizationStatus(token,item.id)
      router.replace('/(tabs)/GoToNotarize');
    }

    return(
   
        <LinearGradient  style={style.container}  colors={['#40B59F', '#fff']}
        locations={[0.41, 1]}>
             <Header username={data.Username} tabName="Danh sách tài liệu cần công chứng"></Header>
      
             <GestureHandlerRootView >
     <SafeAreaView style={style.itemContainer}>
     {documentList ? (
        <FlatList
          data={documentList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (       
              <CustomListDocumentNotarize
              
                code={item.code}
                lan1={item.firstLanguage}
                lan2={item.secondLanguage}
                numberOfNotarize=""
                onPress={()=>{}}/> 
              )}
      />
            ): (
        <Text>Loading data...</Text> // Display loading message while data is being fetched
      )}
          
      </SafeAreaView>
    </GestureHandlerRootView> 
      <View style={style.buttonPanel}>
           <Button style={style.btn} onPress={FinishTask}>Hoàn thành</Button>
        <Button style={style.btn} onPress={()=>router.replace("/(tabs)/GoToNotarize")}> Quay lại</Button>
      </View>
     
        </LinearGradient>
    )

}

const style = StyleSheet.create({
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
    borderRadius:15,
    width:'85%',
    alignSelf:'center',
    marginTop:15,
    backgroundColor:'#fff',
    height:'95%'
  },
    container:{
        flex: 1,
    },
    panel:{
        width:'100%',
        height:'100%',
        flex:1,
        alignContent:'center',
        alignSelf:'center',
        
        
      },
      infoPanel:{

        width:'95%',
        height:'auto',
        borderWidth:1,
        marginTop:10,
        backgroundColor:'#fff',
        flexDirection:'column',
        alignContent:'flex-start',
        alignSelf:'center',
        borderColor: 'grey',
        borderRadius:5,
        paddingBottom:10
      },
    buttonPanel:{
   
   
        width:'100%',
        flexDirection:'row',
        alignContent:'center',
        alignSelf:'center',
        marginBottom:15,

        borderColor: 'grey',
        borderRadius:5,
      }, btn:{
        borderColor: 'black',
        width:150,
        height:45,
        marginTop:15,
        marginHorizontal:'5%',
      },
      Title:{
        fontSize:19,
        fontWeight:'bold',
        alignSelf:'center',
        color:'#4169E1',
        marginTop:5,
        marginBottom:5
      },
      text:{
        flex:1,
        fontSize:17,
        alignSelf:'flex-start',
        marginTop:2,
        flexWrap:'wrap',
        marginLeft:15
      },
      icon:{
        marginLeft: 15,
     
      }
})