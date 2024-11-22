import { avatar } from "@/constants/Image";
import { Text,View, } from "@ant-design/react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect,useState } from "react";
import { StyleSheet,Image } from "react-native";
interface HeaderProps {
  username: string;
  tabName: string;
}

export const Header: React.FC<HeaderProps> = ({ username,tabName })  => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);   

  }, []);

  const formattedTime = currentTime.toLocaleTimeString();   


  return (
    <View style={styles.header}>
        <View style={styles.notif}>
      <FontAwesome name="user-circle" size={30} color={'#fff'} onPress={()=>router.push('/Notification')} />
      </View>
        <View style = {styles.tabname}>
       
      <Text style={styles.timeText}>Xin chào, {username}</Text>

      </View>
      <View style={[styles.notif]}>
      <Ionicons name="notifications" size={30} color={'#fff'} onPress={()=>router.push('/Notification')} />
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
    fontSize: 20,
   
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
  }
});

