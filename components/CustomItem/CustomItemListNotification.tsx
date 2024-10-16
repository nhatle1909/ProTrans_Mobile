import React from 'react';
import { StyleSheet} from 'react-native';
import { ListItem} from '@rneui/themed';

interface CustomListItemNotiProps {
  title : string,
  message : string,
}

const CustomListItemNoti: React.FC<CustomListItemNotiProps> = ({
  title,
  message,
}) => {
  return (

        <ListItem bottomDivider containerStyle={styles.listItemContainer}>
          <ListItem.Content style={styles.content}>
          <ListItem.Title style={styles.listItemTitle}>{title}</ListItem.Title>
          <ListItem.Subtitle style={styles.listItemSubtitle}>{message}</ListItem.Subtitle>  
          </ListItem.Content>
        </ListItem>
  );
};

const styles = StyleSheet.create({

  listItemContainer: {
    width:'90%',
    height:'auto',
    alignSelf:'center',
    backgroundColor: '#FFFFFF', // Light gray background for list items
    borderRadius: 10,
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
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight:'bold'
  },
  listItemSubtitle: {
    fontSize: 12,
    color: '#000',
  }
});

export default CustomListItemNoti;