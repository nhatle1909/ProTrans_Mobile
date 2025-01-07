import { avatar } from "@/constants/Image";
import { Logout } from "@/Utils/Auth/LogoutUtil";
import { Text,View, } from "@ant-design/react-native";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect,useState } from "react";
import { StyleSheet,Image } from "react-native";
interface HeaderProps {
  username: string;
  tabName: string;
}

export const Header: React.FC<HeaderProps> = ({ username,tabName })  => {

  return (
    <View style={styles.header}>
        <View style={styles.notif}>
      <FontAwesome name="user-circle" size={30} color={'#fff'} onPress={()=>router.push('/Profile')} />
      </View>
        <View style = {styles.tabname}>
       
      <Text style={[styles.timeText,{fontFamily:'Quicksand'}]}>Xin chào, {username}</Text>

      </View>
      <View style={[styles.notif]}>
      <Ionicons name="notifications" size={30} color={'#fff'} onPress={()=>router.push('/Notification')} />
      <MaterialCommunityIcons  style={{marginLeft:20}}name="logout" size={30} color="#fff" onPress={()=> Logout()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image:{
  width:45,
  height:45,
  marginLeft:15
  },
  header: {
    flexDirection:'row',
    backgroundColor: '#40B59F',
    padding: 15,
    justifyContent:'space-between'

    
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:30,
    color:'white'
  },
  timeText: {
    fontSize: 18,
    fontWeight:'bold',
    color:'white',
    textAlign:'left',
 
  },
  tabname:{
    fontWeight:'bold',
    padding:5,
  

  },
  notif:{
    alignSelf:'center',
    padding:5,
    flexDirection:'row'
  }
});

