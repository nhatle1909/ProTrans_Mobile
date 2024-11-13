import { avatar } from "@/constants/Image";
import { Text,View, } from "@ant-design/react-native";
import { Ionicons } from "@expo/vector-icons";
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
        <View>
      <Text style={styles.welcomeText}>Xin chào, {username}</Text>
      <Text style={styles.timeText}>{tabName}</Text>

      </View>
      <View style={styles.notif}>
      <Ionicons name="notifications" size={25} color={'#fff'} onPress={()=>router.push('/Notification')} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.33)',
    padding: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent:'space-between'
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:30,
    color:'white'
  },
  timeText: {
    fontSize: 16,
    marginLeft:30,
    color:'white'
  },
  notif:{
    alignSelf:'center',
    marginRight:15
  }
});

