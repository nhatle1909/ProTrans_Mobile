import {Header} from "@/components/Header";
import { DecodeToken, GetToken } from "@/Utils/TokenUtil";
import {Text,View, } from "@ant-design/react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet,Animated, TextInput } from "react-native";
import * as React from 'react';
import { Easing } from 'react-native-reanimated';
import Svg,{G,Circle} from 'react-native-svg'


export default function MainScreen(){
const Token = GetToken();
const data = DecodeToken();

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const [hasAnimated, setHasAnimated] = React.useState(false);
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const percentage = 75
const radius = 40
const strokeWidth = 10
const duration = 500
const color = '#fff'
const  textColor = '#000'
const delay = 0
const max = 100
const animatedValue = React.useRef(new Animated.Value(0)).current;

const animated = React.useRef(new Animated.Value(0)).current;
const circleRef = React.useRef();
const inputRef = React.useRef();
const circumference = 2 * Math.PI * radius;
const halfCircle = radius + strokeWidth;

const animation = (toValue) => {
    Animated.timing(animated, {
      delay: 1000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  React.useEffect(() => {
    if (!hasAnimated) {
      animation(percentage);
      setHasAnimated(true);
    }
    animated.addListener((v) => {
      const maxPerc = 100 * v.value / max;
      const strokeDashoffset = circumference  - (circumference * maxPerc) / 100;
 
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    }, [max, percentage]);

    return () => {
      animated.removeAllListeners();   

    };
  }, []); 
  return (
    <LinearGradient colors={['#40B59F', '#fff']}
    locations={[0.41, 1]} style={Style.background}>
    
    <Header username={data.Username} tabName = 'Thống kê'></Header>
    <View style={[Style.chart,{ width: '100%',maxHeight:'25%' }]}>
      <Svg
        height={radius * 4}
        width={radius * 4}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G
          rotation="-90"
          origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
     
    </View>
    <View style={Style.infoBox}>
      <Text style={Style.infoText}>Số đơn đã hoàn thành</Text>
      <Text style={Style.infoText2}>6</Text>
    </View>
    <View style={Style.infoBox}>
      <Text style={Style.infoText}>Số đơn đang xử lý</Text>
      <Text style={Style.infoText2}>2</Text>
    </View>
   </LinearGradient>
)
}
const Style = StyleSheet.create({
  background:{
    flex:1,
    flexDirection:'column'
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  
  },
  ProfilePanel:{
    width:"100%",
    height:'auto',
    flex:1,
    alignItems:'flex-start'
  },
  ProfileForm:{
    width: '90%',
    padding:15,
    marginTop:15,
    marginHorizontal:'5%',
    borderRadius:5,
    flex:1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  Input:{
    height:40,
    width:'100%',
    fontSize:17,
    paddingLeft:15,
    marginBottom:15,
    borderWidth:1,
    borderRadius:10,
    backgroundColor:'#fff'
  },
  chart:{
    marginTop:'10%',
    marginLeft:'5%',
    alignContent:'center',
    flex:1,
    alignSelf:'flex-start',

  },
  infoBox:{
    borderWidth:2,
    marginTop:'10%',
    marginHorizontal:'5%',
    padding:20,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    borderRadius:30
  },
  infoText:{
    fontSize:18,
  },
  infoText2:{
    fontSize:23,
    fontWeight:'bold',
    borderLeftWidth:2,
    paddingLeft:10
  }
})

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
  });