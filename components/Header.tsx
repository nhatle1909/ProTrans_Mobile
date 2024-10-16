import { avatar } from "@/constants/Image";
import { Text,View, } from "@ant-design/react-native";
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
          <Image source={{uri : avatar}} style={styles.image} resizeMode="contain"/>
        </View>
        <View>
      <Text style={styles.welcomeText}>Welcome, {username}</Text>
      <Text style={styles.timeText}>{tabName}</Text>
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
    borderBottomEndRadius : 25,
    borderBottomStartRadius : 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
});

export default Header;