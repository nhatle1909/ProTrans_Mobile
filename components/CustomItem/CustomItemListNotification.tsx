import React from 'react';
import { StyleSheet, Text} from 'react-native';
import { ListItem} from '@rneui/themed';
import { View } from '@ant-design/react-native';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

interface CustomListItemNotiProps {
  title : string,
  message : string,
  date:string,
  author:string,
}

export const CustomListItemNoti: React.FC<CustomListItemNotiProps> = ({
  title,
  message,
  date,
  author
}) => {
  return (

    <ListItem bottomDivider containerStyle={styles.listItemContainer}>
    
    <ListItem.Content style={styles.content}>
    
    <View style={styles.valueContainer}>
        <Text style={styles.label}>{title}</Text>
        <Text style={[styles.text,{fontStyle:'italic'}]}>{author}</Text>
      </View>
      
    <View style={[styles.address,{ paddingBottom:5,borderBottomWidth:1,}]}>
        <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">{message}</Text>
      </View>
      <View style={styles.deadline}>
      <MaterialCommunityIcons name="calendar-clock" size={23} style={styles.icon} color="black" />
        <Text style={[styles.label,{color:'grey'}]}>{date}</Text>
      </View>
    </ListItem.Content>

  </ListItem>
  );
};

const styles = StyleSheet.create({
  valueContainer:
  {
    width:'100%',
    alignItems:'flex-start',
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
  text:{
    fontSize:16,
    flex:1
  }
});



//<ListItem.Title style={styles.listItemTitle}>{name}</ListItem.Title>
//<ListItem.Subtitle style={styles.listItemSubtitle}>{deadline}</ListItem.Subtitle>

