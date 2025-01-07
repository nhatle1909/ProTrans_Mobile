import { avatar, logo } from "@/constants/Image";
import { useAccountPersonal } from "@/Model/AccountModel";
import { Logout } from "@/Utils/Auth/LogoutUtil";
import { DecodeToken, GetToken } from "@/Utils/TokenUtil";
import { View } from "@ant-design/react-native";
import { Entypo, FontAwesome, FontAwesome5, FontAwesome6, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Image, Pressable, StyleSheet, Text } from "react-native";

export default function Profile()
{   const Token = GetToken();
    const DataToken = DecodeToken();
    const user = useAccountPersonal(Token,DataToken.Id);
    return (
        <LinearGradient   style={style.container}  colors={['#40B59F', '#fff']}
        locations={[0.41, 1]}>
            <View style={style.profilePanel}>
                <View style={style.topPanel}>
                    <View style={style.leftTopPanel}>
                        <Image source={{uri : avatar} } style={style.image} resizeMode="stretch"/>
                    </View>
                    <View style={style.rightTopPanel}>
                        <View style={style.infoRightTopPanel}>
                         <FontAwesome style={style.icon} name="user-circle" size={30} color={'#40B59F'} />
                        <Text style={style.text}> {DataToken.Username} </Text>
                        </View>
                        <View style={style.infoRightTopPanel}>
                         <FontAwesome6 style={[style.icon]} name="centercode" size={30} color={'#40B59F'} />
                        <Text style={style.text}> {user?.code} </Text>
                        </View>
                        <View style={style.infoRightTopPanel}>
                            {user?.gender === 'Male' ? (
                         <MaterialCommunityIcons style={[style.icon]} name="gender-male" size={30} color={'#40B59F'} />
                            ):(   <MaterialCommunityIcons style={[style.icon]} name="gender-female" size={30} color={'#40B59F'} />)}
                         </View>
                    </View>
                </View>
                <View style={style.midPanel}>
                    <View style={style.infoMidPanel}>
                    <FontAwesome style={[style.icon,{marginLeft:15}]} name="phone" size={30} color={'#40B59F'} />
                    <Text style={style.text} numberOfLines={1} lineBreakMode="tail"> {user?.phoneNumber}</Text>
                    </View>
                    <View style={style.infoMidPanel}>
                    <Fontisto style={[style.icon,{marginLeft:15}]} name="email" size={24} color={'#40B59F'} />
                    <Text style={style.text} numberOfLines={1} lineBreakMode="tail"> {DataToken.Email} </Text>
                    </View>
                    <View style={style.infoMidPanel}>
                    <FontAwesome5 style={[style.icon,{marginLeft:15}]} name="store-alt" size={24} color={'#40B59F'} />
                    <Text style={style.text} numberOfLines={1} lineBreakMode="tail"> {user?.agencyName} </Text>
                    </View>
                    {/* <View style={style.infoMidPanel}>
                    <Entypo style={[style.icon,{marginLeft:15}]} name="address" size={24} color={'#40B59F'} />
                    <Text style={style.text} numberOfLines={1} lineBreakMode="tail"> {user?.address} </Text>
                    </View> */}
                    <View style={style.infoMidPanel}>
                    <FontAwesome5 style={[style.icon,{marginLeft:15}]} name="birthday-cake" size={24} color={'#40B59F'} />
                    <Text style={style.text} numberOfLines={1} lineBreakMode="tail"> {user?.dob} </Text>
                  
                    </View>
                    <Pressable style={[style.infoMidPanel,{backgroundColor:'#F04526',height:'auto'}]} onPress={() => Logout()}>
                    <Text style={[style.text,{color:'#fff',textAlign:'center'}]} > Đăng xuất </Text>
                    </Pressable>
        
                </View>
            </View>
            </LinearGradient>
    )
}
const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profilePanel:{
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        borderRadius:15,
        width:'85%',
        alignSelf:'center',
        marginBottom:'25%',
        backgroundColor:'#fff',
        height:'70%',
        borderWidth:1,
        borderColor:'#40B59F',
        alignItems: 'center',
        flexDirection:'column'
    },
    topPanel:{
        
        marginTop:15,
        width:'95%',
        height:'25%',
        borderRadius:15,
        justifyContent:'space-between',
        flexDirection:'row'
    },
    midPanel:{
        width:'95%',
        height:'65%',
        marginTop:15,
        borderRadius:15,
        alignItems:'center'
    },
    botPanel:{

    },
    leftTopPanel:{
        borderRadius:15,
        width:'30%',
        height:'100%',
        marginLeft:15
        
    },
    rightTopPanel:{
 
        borderRadius:15,
        width:'65%',
        height:'100%',
        marginLeft:15
    },
    infoMidPanel:{
        width:'90%',
        height:'auto',
        alignSelf:'center',
        backgroundColor: '#fff', // Light gray background for list items
        borderRadius: 15,
        borderWidth:1,
        borderColor:'#40B59F',
        justifyContent:'flex-start',
        paddingVertical: 10,
        shadowColor: '#40B59F',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        
        shadowOpacity: 0.9,
        shadowRadius: 20,
        elevation: 10,
        flexDirection:'row',
        marginVertical:10
    },
    infoRightTopPanel:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    text:{
        fontSize:17,
        flex:1
    },
    icon:{
        marginRight:15
    },
    image:{
        width:'100%',
        height:'100%'
    }
})