import { CustomListDocumentNotarize } from "@/components/CustomItem/CustomItemNotarizationDetail";
import {Header} from "@/components/Header";
import { NotarizationDetail, useDocumentList2 } from "@/Model/NotarizationDetailModel";
import { UpdateAssignmentNotarizationStatus, UpdateDocumentStatusNotarization } from "@/Utils/ANAPI/AssignmentNotarizationAPI";
import { PostNotification, PostNotificationNota } from "@/Utils/NotificationAPI/NotificationAPI";
import { DecodeToken, GetToken } from "@/Utils/TokenUtil"
import { Button, View } from "@ant-design/react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
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

    const FinishTask=async()=>{ 
      Alert.alert(
        'Xác nhận',
        'Bạn có chắc chắn muốn thực hiện hành động này ? Chọn có sẽ không thể hoàn tác hành động',
        [
          {
            text: 'Không',
            style: 'cancel',
          },
          { text: 'Có', onPress:async () => 
            { 
              await UpdateAssignmentNotarizationStatus(token,item.id)
              UpdateDocumentStatusNotarization(token,item.id)
               PostNotificationNota(token,"59d9635f-3d42-4aff-992d-c84f931a5ed8",data.Username,item.fakecode.toString())
              router.replace('/(tabs)/GoToNotarize');
          }
         },
        ]
      );

    }

    return(
   
        <LinearGradient  style={style.container}  colors={['#40B59F', '#fff']}
        locations={[0.41, 1]}>
             <Header username={data.Username} tabName="Danh sách tài liệu cần công chứng"></Header>
      
             <GestureHandlerRootView>
     <SafeAreaView style={style.itemContainer}>
     {documentList !== null || documentList !== undefined ? (
        <FlatList
          data={documentList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (       
              <CustomListDocumentNotarize
                code={item.code}
                lan1={item.firstLanguage}
                lan2={item.secondLanguage}
                numberOfNotarize={item.numberOfNotarizedCopies.toString()}
                notarizationPrice={item.notarizationPrice}
                onPress={()=>{}}/> 
              )}
      />
            ): (
        <Text style={style.title}>Đang tải dữ liệu</Text> // Display loading message while data is being fetched
      )}
          
      </SafeAreaView>
    </GestureHandlerRootView> 
      <View style={style.buttonPanel}>
      <Button style={[style.btn,{marginLeft:'7%'}]} onPress={()=>router.replace("/(tabs)/Notarization")}><Text style={{fontSize:16,fontFamily:'Quicksand'}}>Quay lại</Text></Button>
      <Button style={[style.btn,{marginRight:'7%', backgroundColor:'green'}]}onPress={()=>FinishTask()}><Text style={{color:'#fff',fontSize:16,fontFamily:'Quicksand'}}>Hoàn thành</Text></Button>
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
        justifyContent:'center'
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
      ,title:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        padding:5,
        marginBottom:5
      }
})