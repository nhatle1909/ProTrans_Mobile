import MapView, { Marker,Polyline } from 'react-native-maps';
import { useState,useEffect, useMemo, useRef} from "react";
import { StyleSheet } from "react-native";
import { ConvertAddress, CreateRoute } from "@/Model/MapModel";
import { View ,Text,Button} from '@ant-design/react-native';
import { useLocalSearchParams,router } from 'expo-router';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import { FontAwesome, FontAwesome5, FontAwesome6, SimpleLineIcons } from '@expo/vector-icons';
import { GetToken } from '@/Utils/TokenUtil';
import { GetOrderData } from '../Model/Order';
import  BottomSheet,{ BottomSheetScrollView } from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
export default function Map(){
  const TokenId = GetToken();
  const snapPoints = useMemo(() => ['60%','100%'],[])
  const bottotSheetRef = useRef(null);
  const pinColor = "Green"
  function formatPrice(value:number) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
  const Data = useLocalSearchParams();
  const [region, setRegion] = useState({
    latitude: 10.837932096000031,
    longitude: 106.83272935100007,
    latitudeDelta: 0.0722,
    longitudeDelta: 0.0221,
  });

  
  const [errorMsg, setErrorMsg] = useState(null);
  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
  setOrigin({
    latitude : location.coords.latitude,
    longitude: location.coords.longitude,
  })
    })();
  }, []);

  const [Address] = useState<string>(Data.address.toString())

  const DestinationCoor = ConvertAddress(Address)
  const routes = CreateRoute(origin.latitude,origin.longitude,DestinationCoor.latitude,DestinationCoor.longitude);
    
  const data = GetOrderData(TokenId,Data.orderId.toString());
  let price = "";

    if ( data?.totalPrice !== undefined) {
      price = formatPrice(data.totalPrice);
    }
    const navigation = () =>{
      if (Data.type === 'Ship') {
        router.replace({pathname:"/Payment",params:{taskId:Data.taskId,orderId:Data.orderId}})
      }
      if (Data.type === 'Pickup'){
        router.replace({pathname:"/DocumentList",params:{orderId:Data.orderId,taskId:Data.taskId}})
      }  
    }
    return (
      <View style={Style.container}>  

      <MapView 
      style={Style.map}
      initialRegion={region}>
    <Marker coordinate={origin}/>
      <Marker coordinate={DestinationCoor}  pinColor={'green'}/>
      <Polyline coordinates={routes} strokeColor='blue' strokeWidth={2}
     />
   </MapView>

<GestureHandlerRootView style ={{   zIndex:2,
        position:'absolute',
        top:'60%',
        left:0,
        bottom:0,
        right:0 }}>
   <BottomSheet
   ref={bottotSheetRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        style={{borderWidth:3,borderRadius:20}}
        >
       <BottomSheetScrollView style ={Style.panel} >
        <View >
        <View style={Style.infoPanel}>

          
        <View style={Style.item}>
          <SimpleLineIcons style={Style.icon} name="location-pin" size={25} color="red"/>
          <Text style={Style.text}>Vị trí hiện tại</Text>
          </View>
          <View style={Style.item}>
          <SimpleLineIcons style={Style.icon} name="location-pin" size={25} color="green" />
          <Text style={Style.text}>{data?.address}</Text>
          </View>
      </View>
      <View style={Style.infoPanel}>
        
        <Text style={Style.Title}>Thông tin khách hàng</Text>
          <View style={{flexDirection:'row'}}>
          <FontAwesome style={Style.icon} name="user" size={25} color="black" />
          <Text style={Style.text}>{data?.fullName}</Text>
          </View>
        
          <View style={Style.item}>
          <FontAwesome style={Style.icon} name="phone" size={25} color="black" />
          <Text style={Style.text}>{data?.phoneNumber}</Text>
          </View>
          <View style={Style.item}>
          <SimpleLineIcons style={Style.icon} name="location-pin" size={25} color="green" />
          <Text style={Style.text}>{data?.address}</Text>
          </View>
      </View>
      <View style={[Style.infoPanel]}>
        
        <Text style={Style.Title}>Thông tin đơn hàng</Text>
        <View style={Style.item}>
          <FontAwesome6 style={Style.icon} name="file-code" size={25} color="black" />
          <Text style={[Style.text,{textAlign:'right',marginRight:10}]}>{data?.id}</Text>
          </View>
        
          <View style={Style.item}>
          <FontAwesome6 style={Style.icon} name="calendar-times" size={25} color="black" />
          <Text style={[Style.text,{textAlign:'right',marginRight:10}]}>{data?.deadline}</Text>
          </View>
          <View style={Style.item}>
          <FontAwesome6 style={Style.icon} name="calendar-times" size={25} color="black" />
          <Text style={[Style.text,{textAlign:'right',marginRight:10}]}>{data?.status}</Text>
          </View>
     
      </View>
      <View style={[Style.infoPanel]}>
        
      <View style={Style.item}>
          <FontAwesome5 style={Style.icon} name="money-bill" size={25} color="green" />
          <Text style={[Style.text,{textAlign:'right',marginRight:15}]}>{price}</Text>
          </View>
      </View>
      <View style={Style.buttonPanel}>
           <Button style={Style.btn}onPress={()=>navigation()}>Hoàn thành</Button>
         <Button style={Style.btn} onPress={()=>router.replace("/(tabs)/Shipping")}> Quay lại</Button>
      </View>
      </View>
      </BottomSheetScrollView>
   </BottomSheet>
</GestureHandlerRootView>
      </View>
      )
    };

    const Style = StyleSheet.create({
      map:{
        flex:1,
      
        zIndex:1
      },
      container:{
        flex:1,
      },
      panel:{
        flex:1,
        width:'100%', 
        alignContent:'center',
      },
      buttonPanel:{
        height:'50%',
        width:'100%',
        flexDirection:'row',
        alignContent:'center',
        alignSelf:'center',
        marginTop:10,
        marginBottom:15,
        borderBottomWidth: 1, // Add border width here
        borderColor: 'grey',
        borderRadius:5,
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
        paddingBottom:10,

        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 10,
      },
      btn:{
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
        paddingRight:5,
      },
      item:{
        flexDirection:'row',
        marginTop:25
      }
    })