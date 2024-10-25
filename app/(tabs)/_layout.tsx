import React from 'react';
import {  MaterialIcons,Ionicons, AntDesign } from '@expo/vector-icons';   
import { Tabs } from 'expo-router';
import Header from '@/components/Header';
import { View } from '@ant-design/react-native';
export default () =>{
  return (
      <Tabs initialRouteName="Dashboard" screenOptions={{ tabBarShowLabel: false, tabBarInactiveBackgroundColor: '#fff', tabBarActiveTintColor: '#000',headerShown:false }}>
        <Tabs.Screen
          name="Dashboard"
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="dashboard" size={25} color={focused ? '#1CE238' : '#999'} />
            ),
          }}
        />
        <Tabs.Screen
          name="TaskList"
          options={{
            tabBarIcon: ({ focused }) => (
     
              <MaterialIcons name="local-shipping" size={25} color={focused ? '#1CE238' : '#999'} />
            ),
          }}
        />

        <Tabs.Screen
          name="Notification"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="notifications" size={25} color={focused ? '#1CE238' : '#999'} />
            ),
          }}
        />
  
      </Tabs>
      
  );
}