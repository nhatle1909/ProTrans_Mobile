import React , { useRef }from 'react';
import { View, StyleSheet, Pressable ,Animated,Text} from 'react-native';
import { ListItem } from '@rneui/themed';

interface CustomListItemProps {
  name: string;
  deadline: string;
  onPress: () => void;
}

const CustomListItem: React.FC<CustomListItemProps> = ({
  name,
  deadline,
  onPress,
}) => {

  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
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
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <ListItem bottomDivider containerStyle={styles.listItemContainer}>
          <ListItem.Content style={styles.content}>
          <View style={styles.textContainer}>
              <Text style={styles.label}>Mã đơn hàng:</Text>
              <Text style={styles.label}>Ngày giao:</Text>
            </View>
            <View style={styles.valueContainer}>
              <ListItem.Title style={styles.listItemTitle}>{name}</ListItem.Title>
              <ListItem.Subtitle style={styles.listItemSubtitle}>{deadline}</ListItem.Subtitle>
            </View>
          </ListItem.Content>
          <View style={styles.buttonContainer}></View>
        </ListItem>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  valueContainer:{flex : 1, alignItems:'flex-end'},
  label:{  fontSize: 16,
    fontWeight: 'bold',},
  textContainer:{
    flex: 1
  },
  listItemContainer: {
    width:'90%',
    height:'85%',
    alignSelf:'center',
    backgroundColor: '#FFFFFF', // Light gray background for list items
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  content:{
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default CustomListItem;