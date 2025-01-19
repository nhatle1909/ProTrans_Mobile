
import { GetOrderData } from "@/Model/Order";
import { PostNotification } from "@/Utils/NotificationAPI/NotificationAPI";
import { SendMail } from "@/Utils/SendMailAPI/SendMailAPI";
import { UpdateTaskStatusCompleted } from "@/Utils/ShippingAPI/ShippingAPI";
import { DecodeToken, GetToken } from "@/Utils/TokenUtil";
import { formatPrice } from "@/Utils/ValidateUtil";
import { View,Button } from "@ant-design/react-native";
import { AntDesign, FontAwesome, FontAwesome5, FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity,Text, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import QRCode from 'react-native-qrcode-svg'; 
import Spinner from "react-native-loading-spinner-overlay";
import { useAccount, useAccountPersonal } from "@/Model/AccountModel";
import { CreateQR } from "@/Utils/VNPayAPI/VNPayAPI";
import { CheckoutSuccessPopup } from "@/components/popup";
import { qr } from "@/constants/Image";
export default function MainScreen(){
const Token = GetToken();
const data = DecodeToken();
const Data = useLocalSearchParams();
const [isLoading,setIsLoading] = useState(false);
const [isCreated,setIsCreated] = useState(false);
const fadeAnim = useRef(new Animated.Value(0)).current;
const order = GetOrderData(Token,Data.orderId.toString());
const account = useAccount(Token,Data.phoneNumber.toString())
const user = useAccountPersonal(Token,data.Id);
const [selectedOption, setSelectedOption] = useState(null);
const fadeAnim2 = useRef(new Animated.Value(0)).current;

const qrFadeAnim = useRef(new Animated.Value(0)).current;

let price = "";

const hubConnection = new HubConnectionBuilder()
.withUrl('https://protrans.azurewebsites.net/notificationHub')
.withAutomaticReconnect()
.build();
const [url,setURL] = useState()
const [isSuccess,setIsSuccess] = useState(false);
useEffect(() => {
  const renewQRCode = async () => {
    try {
      const fetchdata = await CreateQR(Token, data.Id,Data.totalPrice); 
      console.log(fetchdata)
  setURL(fetchdata);
    }
    catch (error) {
      console.error('Error Calling recreate:', error);
    }
  }
  renewQRCode();
},[isCreated])
if ( order?.totalPrice !== undefined) {
      price = formatPrice(order.totalPrice);
}

useEffect(() => {
  const startConnection = async () => {
      try {
        hubConnection.on(`${data.Id}`, async (status,message) => {
          console.log(status)
          if (status === '200'){
            setIsSuccess(true);
            setIsLoading(true);
            
            await UpdateTaskStatusCompleted(Token,Data.taskId.toString());     
            PostNotification(Token,"59d9635f-3d42-4aff-992d-c84f931a5ed8",data.Username,order?.orderCode.toString())
             SendMail(Token,Data.orderId.toString(),data.Username,user?.phoneNumber,account?.email)
  
    
          }// Handle the notification here, e.g., display a notification, update UI, etc.
          if (status === '404'){
            setIsSuccess(false);
              setIsLoading(true);
          
          }
      });
          hubConnection.start()
          .then(() => console.log('Connected'))
           .catch(error => {
            console.error(error)
            hubConnection.start()
            .then(() => console.log('Connected'))
      });

          // Subscribe to a specific method
        
      } catch (error) {
        hubConnection.start()
          .then(() => console.log('Connected'))
          console.error('Error connecting to SignalR Hub:', error);
      }
  };

  startConnection();
  return () => {
      console.log("Stopped")
      hubConnection.stop();
  };
}, []);


useEffect(() => { Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true, }).start(); }, [fadeAnim]);

useEffect(() => {

  

    Animated.timing(fadeAnim2, {

      toValue: 1,

      duration: 1000,

      useNativeDriver: true,

    }).start();

    Animated.timing(qrFadeAnim, {

      toValue: 1,

      duration: 1000,

      useNativeDriver: true,

    }).start();

  

}, [selectedOption]);
const navigate = () => {
  if (account === null || account === undefined || order === null || order === undefined) {
    Toast.show({
      type: 'error', // You can use 'success', 'error', 'info'
      text1: `Dữ liệu chưa tải hoàn thành, xin vui lòng đợi và thử lại sau`,
      text1Style:{fontSize:13,color:'#40B59F'},
      position: 'top',
      topOffset: 20,
      visibilityTime: 3000, // Toast will disappear after 3 seconds
    });
      return;
  }
  else 
    router.push({pathname:"/Camera",params:{taskId:Data.taskId,orderId:Data.orderId,accountId:account?.id,orderCode:order.orderCode}})
}
  return (
    <LinearGradient colors={['#40B59F', '#fff']}
    locations={[0.41, 1]} style={Style.background}>
   {/* <Spinner visible={isLoading} textContent={'Đang xử lý dữ liệu, vui lòng chờ'} textStyle={{fontSize:16,color:'#fff'}} overlayColor="rgba(0, 0, 0, 0.75)" color="#40B59F" /> */}
   
    <GestureHandlerRootView>
    {isLoading === true ? (
         <CheckoutSuccessPopup isVisible={isLoading} success={isSuccess} onClose={()=>setIsLoading(false)}></CheckoutSuccessPopup>
    ) : (
    <View style={[Style.container]}>
 
    <Animated.View style={[Style.infoPanel,{ opacity: fadeAnim }]}>
        
        <Text style={[Style.Title,{fontFamily:'Quicksand'}]}>Thông tin khách hàng</Text>
          <View style={{flexDirection:'row'}}>
          <FontAwesome style={Style.icon} name="user" size={25} color="black" />
          <Text style={[Style.text,{fontFamily:'Quicksand'}]}>{order?.fullName}</Text>
          </View>
        
          <View style={Style.item}>
          <FontAwesome style={Style.icon} name="phone" size={25} color="black" />
          <Text style={[Style.text,{fontFamily:'Quicksand'}]}>{order?.phoneNumber}</Text>
          </View>
          <View style={Style.item}>
          <SimpleLineIcons style={Style.icon} name="location-pin" size={25} color="green" />
          <Text style={Style.text}>{order?.address}</Text>
          </View>
      </Animated.View>
      <Animated.View style={[Style.infoPanel,{ opacity: fadeAnim }]}>
        <Text style={[Style.Title,{fontFamily:'Quicksand'}]}>Thông tin đơn hàng</Text>
        <View style={Style.item}>
        <AntDesign name="codesquareo" style={Style.icon} size={25} color="black" />
        <Text style={[Style.text,{textAlign:'left',marginRight:10},{fontFamily:'Quicksand'}]}>Mã đơn hàng</Text>
          <Text style={Style.text}>{order?.orderCode}</Text>
          </View>
          <View style={[Style.item]}>
            
          <FontAwesome5 style={[Style.icon]} name="money-bill" size={25} color="green" />
          <Text style={[Style.text,{textAlign:'left',marginRight:10},{fontFamily:'Quicksand'}]}>Tổng tiền</Text>
          <Text style={[Style.text]}>{price}</Text>
          
          </View>
     
      </Animated.View> 
      <View style={styles.row}>
       <TouchableOpacity style={[styles.option, selectedOption === 'VNPay' && styles.selectedOption]} onPress={() => setSelectedOption('VNPay')}>
        <Text style={[selectedOption==='VNPay' ? styles.selectedOptonsText : styles.optionText]}>VNPay</Text>
       </TouchableOpacity>

      <TouchableOpacity style={[styles.option, selectedOption === 'Momo' && styles.selectedOption]} onPress={() => setSelectedOption('Momo')}>
      <Text style={[selectedOption==='Momo' ? styles.selectedOptonsText : styles.optionText]}>Momo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.option, selectedOption === 'Cash' && styles.selectedOption]} onPress={() => setSelectedOption('Cash')}>
      <Text style={[selectedOption==='Cash' ? styles.selectedOptonsText : styles.optionText]}>Tiền mặt</Text>
      </TouchableOpacity>
      </View>
      {/* QRCode */}
      {selectedOption === 'VNPay' && (
          <>
        {url !== undefined ? (
        <Animated.View style={[styles.qrContainer, { opacity: qrFadeAnim }]}>
            <QRCode value={url} size={150}/>
          <Animated.Text style={[styles.qrText, { opacity: fadeAnim2 }]}>
            Scan to Pay
          </Animated.Text>
        </Animated.View>
        ):
        (  <Animated.View style={[styles.qrContainer, { opacity: qrFadeAnim }]}>
        <Text style={[styles.qrText]}>
          Đang tạo mã QR
        </Text>
      </Animated.View>)
        } 
        </>
      )}
        {/* Momo */}
        {selectedOption === 'Momo' && (
          <>
        <Animated.View style={[styles.qrContainer, { opacity: qrFadeAnim }]}>
        <Image source={{uri : qr}} style={{width:150,height:150}}resizeMode="contain"/>
          <Animated.Text style={[styles.qrText, { opacity: fadeAnim2 }]}>
            Scan to Pay
          </Animated.Text>
        </Animated.View>
        </>
      )}
        {/* Cash */}
       <View style={Style.buttonPanel}>
       
        <Button style={[Style.btn,{marginLeft:'7%'}]} onPress={()=>router.replace("/(tabs)/Shipping")}><Text style={{fontSize:16,fontFamily:'Quicksand'}}>Quay lại</Text></Button>
        {selectedOption === 'VNPay' && (
         <Button style={[Style.btn,{marginRight:'7%', backgroundColor:'green'}]} onPress={()=>setIsCreated(!isCreated)}><Text style={{color:'#fff',fontSize:16,fontFamily:'Quicksand'}}>Tạo lại QR</Text></Button>
        )}
         {selectedOption !== 'VNPay' && (
          <Button style={[Style.btn,{marginRight:'7%', backgroundColor:'green'}]} onPress={()=>navigate()}><Text style={{color:'#fff',fontSize:16,fontFamily:'Quicksand'}}>Hoàn thành</Text></Button> 
        )}
         </View>
      </View>
   )}
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
    alignItems:'center',

    marginHorizontal:'5%',
    marginTop:'5%',
  },
 switch:{
    alignSelf:'flex-start',
  
    transform:[{scale:1.5}]

 },
 text:{
  flex:1,
  fontSize:17,
  alignSelf:'flex-start',
  marginTop:2,
  flexWrap:'wrap',
  marginLeft:15,
  textAlign:'right',
  marginRight:20
},
   infoPanel:{
    width:'95%',
    height:'auto',
    marginTop:20,
    backgroundColor:'#fff',
    flexDirection:'column',
    alignContent:'flex-start',
    alignSelf:'center',
    borderColor: 'grey',
    borderRadius:20,
    paddingBottom:15,

    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 10,
},
icon:{
  marginLeft: 15,
  paddingRight:5,
},
item:{
  flexDirection:'row',
  marginTop:25
},
Title:{
  fontSize:19,
  fontWeight:'bold',
  alignSelf:'center',
  color:'#4169E1',
  marginTop:5,
  marginBottom:5
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
  justifyContent:'center'
}, btn:{
  borderColor: 'black',
  width:150,
  height:45,
  marginTop:15,
  marginHorizontal:'5%',
},
})

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#f5f5f5',

  },

  title: {

    fontSize: 24,

    fontWeight: 'bold',

    marginBottom: 20,

  },

  row: {

    flexDirection: 'row',

    justifyContent: 'space-evenly',

    width: '95%',    marginBottom:15,
    marginTop:15,
    
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 10,
    borderRadius:20,
    padding:5,
    backgroundColor: '#fff',
  },

  option: {

    backgroundColor: '#fff',

    padding: 10,

    borderRadius: 10,

    marginVertical: 5,


    width: '30%',

    alignItems: 'center',
    borderColor: '#0068c2',
    borderWidth:1
  },

  selectedOption: {

    borderColor: '#0068c2',
    backgroundColor: '#0068C2',

    borderWidth:1
  },
  selectedOptonsText:{
    color:'#fff',
    fontSize: 18,
  }
  ,

  optionText: {

    color: '#000',

    fontSize: 18,

  },

  qrContainer: {

    alignItems: 'center',


  },

  qrText: {

    fontSize: 18,

    marginTop: 10,

  },});


