import MapView, { Marker,Polyline } from 'react-native-maps';
import { useState,useEffect} from "react";
import { StyleSheet } from "react-native";
import { ConvertAddress, Coordinate, CreateRoute } from "@/Model/MapModel";
import { View ,Text,Button} from '@ant-design/react-native';
import { useLocalSearchParams,router } from 'expo-router';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Feather, FontAwesome5, FontAwesome6, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { GetToken } from '@/Utils/TokenUtil';
import { GetOrderData } from '../Model/Order';
const TokenId = GetToken();
export default function Map(){
  function formatPrice(value:number) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
  const Id = useLocalSearchParams();
  const [region, setRegion] = useState({
    latitude: 10.837932096000031,
    longitude: 106.83272935100007,
    latitudeDelta: 0.0722,
    longitudeDelta: 0.0221,
  });
  const origin = {latitude: 10.837932096000031,
    longitude: 106.83272935100007}
    let CorrectDestionationCoor : Coordinate = {
      latitude: 0,
      longitude: 0,
    };
  const [Address] = useState<string>(Id.address.toString())
  
  const DestinationCoor = ConvertAddress(Address)
  const routes = CreateRoute(DestinationCoor.latitude,DestinationCoor.longitude);
    
    const data = GetOrderData(TokenId,Id.id.toString());
    let price = "";
    if ( data?.totalPrice !== undefined) {
      price = formatPrice(data.totalPrice);
    }


    return (
      <View style={Style.container}>
      <MapView 
      
      mapType='standard'
      style={Style.map}
      initialRegion={region}>
    <Marker coordinate={origin}/>
      <Marker coordinate={DestinationCoor}/>
      <Polyline coordinates={routes} strokeColor='blue' strokeWidth={1}/>
   </MapView>
   <GestureHandlerRootView >
      <ScrollView>
   <View style={[Style.panel,{borderTopWidth:1}]}>
      
      <View style={Style.infoPanel}>
        
        <Text style={Style.Title}>Thông tin khách hàng</Text>
          <View style={{flexDirection:'row'}}>
          <Feather style={Style.icon} name="user" size={25} color="black" />
          <Text style={Style.text}>{data?.fullName}</Text>
          </View>
        
          <View style={{flexDirection:'row',marginTop:25}}>
          <Feather style={Style.icon} name="phone" size={25} color="black" />
          <Text style={Style.text}>{data?.phoneNumber}</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:25}}>
          <SimpleLineIcons style={Style.icon} name="location-pin" size={25} color="green" />
          <Text style={Style.text}>{data?.address}</Text>
          </View>
      </View>
      <View style={[Style.infoPanel,{marginTop:10}]}>
        
        <Text style={Style.Title}>Thông tin đơn hàng</Text>
          <View style={{flexDirection:'row'}}>
          <FontAwesome6 style={Style.icon} name="file-code" size={25} color="black" />
          <Text style={[Style.text,{textAlign:'right',marginRight:10}]}>{data?.id}</Text>
          </View>
        
          <View style={{flexDirection:'row',marginTop:25}}>
          <FontAwesome6 style={Style.icon} name="calendar-times" size={25} color="black" />
          <Text style={[Style.text,{textAlign:'right',marginRight:10}]}>{data?.deadline}</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:25}}>
          <FontAwesome6 style={Style.icon} name="calendar-times" size={25} color="black" />
          <Text style={[Style.text,{textAlign:'right',marginRight:10}]}>{data?.status}</Text>
          </View>
          <View style={{flexDirection:'row',marginTop:25}}>
          <FontAwesome5 style={{marginLeft:10}} name="money-bill" size={25} color="green" />
          <Text style={[Style.text,{textAlign:'right',marginRight:10}]}>{price}</Text>
          </View>
      </View>
      <View style={Style.buttonPanel}>
           <Button style={Style.btn}>Hoàn thành</Button>
        <Button style={Style.btn} onPress={()=>router.replace("/(tabs)/TaskList")}> Quay lại</Button>
      </View>
   </View>
   </ScrollView>
   </GestureHandlerRootView>

      </View>
      )
    };

    const Style = StyleSheet.create({
    map:{
   
      width:'100%',
      height:'60%',
      borderColor: 'black',
    },
    container:{
      flex:1,
      flexDirection:'column',

    },
    panel:{
      width:'100%',
      height:'100%',
      flex:1,
      alignContent:'center',
      alignSelf:'center',
      
      
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
    btn:{
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