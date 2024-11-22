import React from 'react';
import {  MaterialIcons,Ionicons} from '@expo/vector-icons';   
import { Tabs } from 'expo-router';
import { MyTabBar } from '@/components/CustomItem/MyTabBar';

export default () =>{
  return (
      <Tabs  tabBar={props => <MyTabBar{...props} />} screenOptions={{ tabBarShowLabel: false, tabBarInactiveBackgroundColor: '#fff', tabBarActiveTintColor: '#000',headerShown:false }}>
       <Tabs.Screen
          name="GetDocument"
          options={{
            tabBarIcon: ({ focused }) => (
     
              <MaterialIcons name="local-shipping" size={25} color={focused ? '#1CE238' : '#999'} />
            ),
            unmountOnBlur: true
          }}
          
        />

        <Tabs.Screen
          name="Shipping"
          options={{
            tabBarIcon: ({ focused }) => (
     
              <MaterialIcons name="local-shipping" size={25} color={focused ? '#1CE238' : '#999'} />
            ),
            unmountOnBlur: true,
            
          }}
        />

        <Tabs.Screen
          name="Notarization"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="notifications" size={25} color={focused ? '#1CE238' : '#999'} />
            ),
            unmountOnBlur: true
          }}
        />
     <Tabs.Screen
          name="GoToNotarize"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="notifications" size={25} color={focused ? '#1CE238' : '#999'} />
            ),
            unmountOnBlur: true
          }}
        />
  
      </Tabs>
      
  );
}