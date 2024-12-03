import {Header} from "@/components/Header";
import { qr } from "@/constants/Image";
import { useAccount, useAccountPersonal } from "@/Model/AccountModel";
import { GetOrderData } from "@/Model/Order";
import { GetAccount } from "@/Utils/AccountAPI/AccountAPI";
import { DecodeToken, GetToken } from "@/Utils/TokenUtil";
import { formatPrice } from "@/Utils/ValidateUtil";
import { Button,View } from "@ant-design/react-native";
import { AntDesign, FontAwesome, FontAwesome5, FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity,Text, Image } from "react-native";
import { GestureHandlerRootView, ScrollView,Switch } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
export default function MainScreen(){
const Token = GetToken();
const data = DecodeToken();
const Data = useLocalSearchParams();
const [isEnabled, setIsEnabled] = useState(false);
const [PaymentMethod,setPaymentMethod] = useState("Tiền mặt")
const fadeAnim = useRef(new Animated.Value(0)).current;
const order = GetOrderData(Token,Data.orderId.toString());
const account = useAccount(Token,Data.phoneNumber.toString())
let price = "";

if ( order?.totalPrice !== undefined) {
      price = formatPrice(order.totalPrice);
}


useEffect(() => { Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true, }).start(); }, [fadeAnim]);

const toggleSwitch = () => {
  setIsEnabled(!isEnabled);
  if (isEnabled) setPaymentMethod("Tiền mặt")
  if (!isEnabled) setPaymentMethod("Chuyển qua VNPay")  
};
const [selectedOption, setSelectedOption] = useState(null);

const fadeAnim2 = useRef(new Animated.Value(0)).current;

const qrFadeAnim = useRef(new Animated.Value(0)).current;



useEffect(() => {

  if (selectedOption === 'QR') {

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

  } else {

    fadeAnim2.setValue(0);

    qrFadeAnim.setValue(0);

  }

}, [selectedOption]);



const navigate = () => {
  if (account === null || account === undefined) {
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
    router.push({pathname:"/Camera",params:{taskId:Data.taskId,orderId:Data.orderId,accountId:account?.id}})
}
  return (
    <LinearGradient colors={['#40B59F', '#fff']}
    locations={[0.41, 1]} style={Style.background}>
  
<GestureHandlerRootView>
<Toast></Toast>
    <View style={[Style.container]}>
    <Animated.View style={[Style.infoPanel,{ opacity: fadeAnim }]}>
        
        <Text style={Style.Title}>Thông tin khách hàng</Text>
          <View style={{flexDirection:'row'}}>
          <FontAwesome style={Style.icon} name="user" size={25} color="black" />
          <Text style={Style.text}>{order?.fullName}</Text>
          </View>
        
          <View style={Style.item}>
          <FontAwesome style={Style.icon} name="phone" size={25} color="black" />
          <Text style={Style.text}>{order?.phoneNumber}</Text>
          </View>
          <View style={Style.item}>
          <SimpleLineIcons style={Style.icon} name="location-pin" size={25} color="green" />
          <Text style={Style.text}>{order?.address}</Text>
          </View>
      </Animated.View>
      <Animated.View style={[Style.infoPanel,{ opacity: fadeAnim }]}>
        <Text style={Style.Title}>Thông tin đơn hàng</Text>
        <View style={Style.item}>
        <AntDesign name="codesquareo" style={Style.icon} size={25} color="black" />
        <Text style={[Style.text,{textAlign:'left',marginRight:10}]}>Mã đơn hàng</Text>
          <Text style={Style.text}>{order?.orderCode}</Text>
          </View>
          <View style={[Style.item]}>
            
          <FontAwesome5 style={[Style.icon]} name="money-bill" size={25} color="green" />
          <Text style={[Style.text,{textAlign:'left',marginRight:10}]}>Tổng tiền</Text>
          <Text style={[Style.text]}>{price}</Text>
          
          </View>
     
      </Animated.View> 
      <View style={styles.row}>
        <TouchableOpacity style={[styles.option, selectedOption === 'QR' && styles.selectedOption]} onPress={() => setSelectedOption('QR')}
        >
          <Text style={styles.optionText}>QR</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={[styles.option, selectedOption === 'Cash' && styles.selectedOption]}  onPress={() => setSelectedOption('Cash')}
        >
          <Text style={styles.optionText}>Cash</Text>
        </TouchableOpacity>
        </View> {selectedOption === 'QR' && (
        <Animated.View style={[styles.qrContainer, { opacity: qrFadeAnim }]}>
        <Image source={{uri : qr}} style={{width:150,height:150}}resizeMode="contain"/>
          <Animated.Text style={[styles.qrText, { opacity: fadeAnim2 }]}>
            Scan to Pay
          </Animated.Text>
        </Animated.View>
        )}
       <View style={Style.buttonPanel}>
       
        <Button style={[Style.btn,{marginLeft:'7%'}]} onPress={()=>router.replace("/(tabs)/Shipping")}> Quay lại</Button>
         <Button style={[Style.btn,{marginRight:'7%', backgroundColor:'green'}]} onPress={navigate}><Text style={{color:'#fff',fontSize:16}}>Hoàn thành</Text></Button>
      </View>
      </View>
     
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
    marginTop:30,
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

    justifyContent: 'space-around',

    width: '80%',
    marginTop:20

  },

  option: {

    backgroundColor: '#fff',

    padding: 15,

    borderRadius: 10,

    marginVertical: 10,

    width: '40%',

    alignItems: 'center',

  },

  selectedOption: {

    borderColor: '#0068c2',
    borderWidth:2

  },

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


