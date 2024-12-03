import MapView, { Marker,Polyline } from 'react-native-maps';
import { useState,useEffect, useMemo, useRef} from "react";
import { StyleSheet } from "react-native";
import { ConvertAddress, CreateRoute } from "@/Model/MapModel";
import { View ,Text,Button} from '@ant-design/react-native';
import { useLocalSearchParams,router } from 'expo-router';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import { AntDesign, FontAwesome, FontAwesome5, FontAwesome6, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { GetToken } from '@/Utils/TokenUtil';
import { GetOrderData } from '../Model/Order';
import  BottomSheet,{ BottomSheetScrollView } from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import { formatPrice } from '@/Utils/ValidateUtil';
import MapboxGL, { PointAnnotation } from "@rnmapbox/maps"
MapboxGL.setAccessToken("sk.eyJ1IjoiY2FkZW56IiwiYSI6ImNtM2U5MW12ODA5cGUya3IzNG90a25zMnoifQ.99nRizDqZJPtwwCCxa1juA")
export default function Map(){
  const TokenId = GetToken();
  const snapPoints = useMemo(() => ['60%','100%'],[])
  const bottotSheetRef = useRef(null);
  const pinColor = "Green"
  
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
        router.push({pathname:"/DocumentList",params:{orderId:Data.orderId,taskId:Data.taskId}})
    }

    const feature: GeoJSON.Feature<GeoJSON.LineString> = {
      type: 'Feature',
      geometry: {
          type: 'LineString',
          coordinates: routes
      },
      properties: {}, // Add an empty properties object
  };
    return (
      <View style={Style.container}>  

<MapboxGL.MapView style={{ flex: 1 }}>
<MapboxGL.Camera zoomLevel={16} centerCoordinate={[origin.longitude,origin.latitude]}/>
<MapboxGL.PointAnnotation
        children={<></>}
        coordinate={[origin.longitude,origin.latitude]}
        id='Origin'
        title="Vị trí hiện tại"
      />
     <MapboxGL.PointAnnotation
        children={<></>}
        coordinate={[DestinationCoor.longitude,DestinationCoor.latitude]}
        id='Destination'
        title="Điểm đến"
      />
  <MapboxGL.ShapeSource  id="polyline-source" shape={feature}>
            <MapboxGL.LineLayer
              id="routerLine01"
              style={{
                lineColor: '#FA9E14',
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
    </MapboxGL.MapView> 


<GestureHandlerRootView style ={{   zIndex:2,
        position:'absolute',
        top:'60%',
        left:0,
        bottom:0,
        right:0 }}>
   <BottomSheet
   ref={bottotSheetRef}
        index={1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        style={{borderRadius:20}}
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
          <SimpleLineIcons style={Style.icon} name="location-pin" size={20} color="red" />
          <Text style={Style.text}>{data?.address}</Text>
          </View>
      </View>
      <View style={[Style.infoPanel]}>
        
        <Text style={Style.Title}>Thông tin đơn hàng</Text>
        <View style={Style.item}>
 
        <AntDesign name="codesquareo" style={Style.icon} size={25} color="black" />
          <Text style={[Style.text,{textAlign:'left',marginRight:10}]}>Mã đơn hàng</Text>
          <Text style={[Style.text,{textAlign:'right',marginRight:10}]}>{data?.orderCode}</Text>
          </View>
        
          <View style={Style.item}>
          <MaterialCommunityIcons name="calendar-clock" style={Style.icon}   size={25} color="black" />
          <Text style={[Style.text,{textAlign:'left',marginRight:10}]}>Hạn giao đơn hàng</Text>
          <Text style={[Style.text,{textAlign:'right',marginRight:10}]}>{data?.deadline}</Text>
          </View>
          <View style={Style.item}>
          <FontAwesome style={Style.icon} name="clipboard" size={25} color="black" />
          <Text style={[Style.text,{textAlign:'left',marginRight:10}]}>Trạng thái</Text>
          <Text style={[Style.text,{textAlign:'right',marginRight:10}]}>Đang vận chuyển</Text>
          </View>
     
      </View>
      <View style={[Style.infoPanel]}>
        
      <View style={[Style.item,{}]}>
          <FontAwesome5 style={Style.icon} name="money-bill" size={25} color="green" />
              <Text style={[Style.text,{textAlign:'left',marginRight:10}]}>Tổng tiền</Text>
          <Text style={[Style.text,{textAlign:'right',marginRight:15}]}>{price}</Text>
          </View>
      </View>
      <View style={Style.buttonPanel}>
          
         <Button style={[Style.btn,{marginLeft:'7%'}]} onPress={()=>router.replace("/(tabs)/Notarization")}> Quay lại</Button>
         <Button style={[Style.btn,{marginRight:'7%', backgroundColor:'green'}]}onPress={()=>navigation()}><Text style={{color:'#fff',fontSize:16}}>Hoàn thành</Text></Button>
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
        justifyContent:'space-between'
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
        shadowOffset: {
          width: 0,
          height: 0,
        },
        
        shadowOpacity: 0.9,
        shadowRadius: 20,
        elevation: 10,
        
      },
      btn:{
        width:150,
        height:45,
        marginTop:15,
  
        borderWidth:0
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