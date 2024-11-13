import React , { useRef }from 'react';
import { View, StyleSheet, Pressable ,Animated,Text} from 'react-native';
import { ListItem } from '@rneui/themed';

interface CustomListItemProps {
  id : string;
  status : string;
  deadline: string;
  onPress: () => void;
}

export const CustomListNotarize: React.FC<CustomListItemProps> = ({
  id,
  status,
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
      <Animated.View style={[ {transform: [{ scale: scaleValue }] }]}>
   
        <ListItem bottomDivider containerStyle={styles.listItemContainer}>
    
          <ListItem.Content style={styles.content}>
          
          <View style={styles.valueContainer}>
              <Text style={{fontSize:13}}>{status}</Text>
            </View>
          <View style={[styles.address,{ paddingBottom:5,borderBottomWidth:1,}]}>
              <Text style={styles.label}>{id}</Text>
            </View>
            <View style={styles.deadline}>
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  address:{
    width:'100%',
    marginTop:5,
    alignItems:'flex-start',
 
  },
  deadline:{
    width:'100%',
    alignItems:'center',
  },
  listItemContainer: {
    width:'90%',
    height:'auto',
    alignSelf:'center',
    backgroundColor: '#FFFFFF', // Light gray background for list items
    borderRadius: 10,
    borderWidth:1,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor:'#40B59F',
    marginBottom:15
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
});



//<ListItem.Title style={styles.listItemTitle}>{name}</ListItem.Title>
//<ListItem.Subtitle style={styles.listItemSubtitle}>{deadline}</ListItem.Subtitle>