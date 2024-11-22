import React , { useRef }from 'react';
import { View, StyleSheet, Pressable ,Animated,Text} from 'react-native';
import { ListItem } from '@rneui/themed';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

interface CustomListItemProps {
  name: string;
  money:string;
  deadline: string;
  onPress: () => void;
}

export const CustomListItem: React.FC<CustomListItemProps> = ({
  name,
  money,
  deadline,
  onPress,
}) => {

  const scaleValue = useRef(new Animated.Value(1)).current;
  const itemColor = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(itemColor, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };
  return (
    
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      
    >
      <Animated.View style={[{transform: [{ scale: scaleValue }] }]}>
   
        <ListItem bottomDivider containerStyle={styles.listItemContainer}>
    
          <ListItem.Content style={styles.content}>
          
          <View style={styles.valueContainer}>
              <Text style={{fontSize:16}}>{money}</Text>
            </View>
            
          <View style={[styles.address,{ paddingBottom:5,borderBottomWidth:1,}]}>
          <SimpleLineIcons style={styles.icon} name="location-pin" size={23} color="red"/>
              <Text style={styles.label} numberOfLines={3} ellipsizeMode="tail">{name}</Text>
            </View>
            <View style={styles.deadline}>
            <MaterialCommunityIcons name="calendar-clock" size={23} style={styles.icon} color="black" />
              <Text style={[styles.label,{color:'grey'}]}>{deadline}</Text>
            </View>
          </ListItem.Content>
     
        </ListItem>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  valueContainer:
  {
    width:'100%',
    alignItems:'flex-end',
    marginTop:-5,
    marginRight:-10,
    
  },
  label:
  {  
    fontSize: 17,
    fontWeight: 'bold',
    flex:1
  },
  address:{
    width:'100%',
    marginTop:5,
    alignItems:'flex-start',
    flexDirection:'row',

  
  },
  deadline:{
    width:'100%',
    alignItems:'center',
    flexDirection:'row',
    marginTop:10
  },
  listItemContainer: {
    width:'90%',
    height:'auto',
    alignSelf:'center',
    backgroundColor: '#fff', // Light gray background for list items
    borderRadius: 10,
    borderWidth:0,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 10,
  
    marginVertical:10
  },
  content:{
  },
  listItemTitle: {
    fontSize: 16,
   
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapButton: {
    backgroundColor: '#4CAF50', // Light green color
    marginRight: 10,
  },
  updateButton: {
    backgroundColor: '#FF9800', // Orange color
  },
  icon:{
    
    paddingRight:10,
  },
});



//<ListItem.Title style={styles.listItemTitle}>{name}</ListItem.Title>
//<ListItem.Subtitle style={styles.listItemSubtitle}>{deadline}</ListItem.Subtitle>