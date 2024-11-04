import Header from "@/components/Header";
import { GetOrderData } from "@/Model/Order";
import { GetAssignmentNotarizations, UpdateAssignmentNotarizationStatus } from "@/Utils/ANAPI/AssignmentNotarizationAPI";
import { GetOrder } from "@/Utils/OrderAPI/OrderAPI";
import { DecodeToken, GetToken } from "@/Utils/TokenUtil"
import { Button, View } from "@ant-design/react-native";
import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { ScrollView,GestureHandlerRootView } from "react-native-gesture-handler";
export default function NotarizationDetail(){
    const data = DecodeToken();
    const token = GetToken()
    const item = useLocalSearchParams()
    console.log(item)
    const FinishTask=async()=>{
      UpdateAssignmentNotarizationStatus(token,item.id)
      router.replace('/(tabs)/TaskList');
    }
    return(
       
        <LinearGradient  style={style.container}  colors={['#79D2A0', '#3E6C52']}
        locations={[0.41, 1]}>
             <Header username={data.Username} tabName="Chi tiết công việc"></Header>
      
   <View style={[style.panel,{borderTopWidth:1}]}>
      
      <View style={[style.infoPanel,{marginTop:10}]}>
        
        <Text style={style.Title}>Thông tin công chứng tài liệu</Text>
          <View style={{flexDirection:'row'}}>
          <FontAwesome6 style={style.icon} name="file-code" size={25} color="black" />
          <Text style={style.text}>Mã tài liệu</Text>
          <Text style={[style.text,{textAlign:'right',marginRight:10}]}>{item.code}</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:25}}>
          <FontAwesome6 style={style.icon} name="calendar-times" size={25} color="black" />
          <Text style={style.text}>Thời hạn</Text>
          <Text style={[style.text,{textAlign:'right',marginRight:10}]}>{item.deadline}</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:25}}>
          <FontAwesome6 style={style.icon} name="calendar-times" size={25} color="black" />
          <Text style={style.text}>Trạng thái công việc</Text>
          <Text style={[style.text,{textAlign:'right',marginRight:10}]}>{item.status === "Notarize" ? 'Đã công chứng' : 'Đang công chứng' }</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:25}}>
          <Ionicons style={{marginLeft:10}} name="document-attach-outline" size={25} color="green" />
          <Text style={style.text}>Số bản công chứng</Text>
          <Text style={[style.text,{textAlign:'right',marginRight:10}]}>{item.numberOfNotarize}</Text>
          </View>
      </View>
      <View style={style.buttonPanel}>
           <Button style={style.btn} onPress={FinishTask}>Hoàn thành</Button>
        <Button style={style.btn} onPress={()=>router.replace("/(tabs)/TaskList")}> Quay lại</Button>
      </View>
   </View>
     
        </LinearGradient>
    )
}
const style = StyleSheet.create({
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
        height:'50%',
        width:'100%',
        flexDirection:'row',
        alignContent:'center',
        alignSelf:'center',
        marginBottom:15,
        borderBottomWidth: 1, // Add border width here
        borderColor: 'grey',
        borderRadius:5,
      }, btn:{
        borderColor: 'black',
        width:150,
        height:45,
        marginTop:15,
        marginHorizontal:'7%',
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