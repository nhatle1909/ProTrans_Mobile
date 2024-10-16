import React, {  useState }  from 'react';
import { View,Text } from "@ant-design/react-native";
import CustomListItem from "@/components/CustomItem/CustomItemList";
import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import Header from '@/components/Header';
import {  AssignmentNotarizationModel, useAssignmentNotarizations } from '../Model/AssNota';
import { useShippingTaskList } from '../Model/ShippingModel';

export default function NotarizationTask() {

  const [visible, setVisible] = useState(false);
  const [visible2,setVisible2] = useState(false);
  const height = useSharedValue(0);
  const height2 = useSharedValue(0);


  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, { duration: 500 }),
      overflow: 'hidden',
    };
  });
  const animatedStyle2= useAnimatedStyle(() => {
    return {
      height: withTiming(height2.value, { duration: 500 }),
      overflow: 'hidden',
    };
  });
 const toggleVisibility1 = () => {
    setVisible(!visible);
    height.value = visible ? 0 : 100
  };
  const toggleVisibility2 = () => {
    setVisible2(!visible2);
    height2.value = visible2 ? 0 : 100
  };
const AssNotaList = useAssignmentNotarizations();
const ShippingTaskList = useShippingTaskList();
  const handleShippingPress = () =>{

  }
  return (

    <LinearGradient colors={['#79D2A0', '#3E6C52']}
    locations={[0.41, 1]} style={style.container}>
      <Header username='Thằng ngu' tabName = 'Danh sách công việc'></Header>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[style.taskList,{marginTop:25}]}>
        <Text style={style.taskListText}>Shipping Tasks</Text>
        <FontAwesome6 name="angle-down" size={24} color="black" style={style.btn} onPress={toggleVisibility1}></FontAwesome6>
      </View>
      <SafeAreaView>
        <FlatList
          data={ShippingTaskList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Animated.View style={animatedStyle}>
              <CustomListItem
                name={item.code}
                deadline={item.deadline}
                onPress={handleShippingPress} 
              />
            </Animated.View>
          )}
        />
      </SafeAreaView>
      <View style={[style.taskList]}>
        <Text style={style.taskListText}>Notarization Tasks</Text>
        <FontAwesome6 name="angle-down" size={24} color="black" style={style.btn} onPress={toggleVisibility2}></FontAwesome6>
      </View>
      <SafeAreaView>
        <FlatList
          data={AssNotaList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Animated.View style={animatedStyle2}>
              <CustomListItem
                name={item.code}
                deadline={item.deadline}
                onPress={handleShippingPress} 
              />
            </Animated.View>
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
   
    </LinearGradient>
  );
}
const style = StyleSheet.create({
  container:{
    flex:1
  },
  taskList :{
    borderRadius:10,
    borderWidth:1,
    width:'90%',
    height:40,
    alignSelf:'center',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#fff'
  },
  taskListText:{
    marginLeft:10
  },
  btn:{
    marginRight:10,
  }
});