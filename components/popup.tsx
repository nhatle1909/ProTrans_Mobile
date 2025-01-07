import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { router } from 'expo-router';
export const CheckoutSuccessPopup = ({ isVisible, onClose,success }) => {
  const [opacity] = useState(new Animated.Value(0));

  Animated.timing(opacity, {
    toValue: 1,
    duration: 250,
    useNativeDriver: true,
  }).start();

  if (!isVisible) {
    opacity.setValue(0); 
  }

  return (
    <Animated.View 
      style={ success ? [styles.modal, { opacity }] :[styles.modal2, { opacity }]  }
      pointerEvents={isVisible ? 'auto' : 'none'} 
    >
      <View style={styles.modalContent}>
        {success === true ? (
        <><Text style={[styles.title,{fontFamily:'Quicksand'}]}>Thanh toán thành công</Text>
        <Text style={[styles.message,{fontFamily:'Quicksand'}]}>Khách hàng đã thanh toán thành công</Text>
                <TouchableOpacity style={styles.button} onPress={()=>router.replace("/(tabs)/Shipping")}>
                <Text style={styles.buttonText}>Quay lại</Text>
              </TouchableOpacity>
              </>
        ):(
          <><Text style={[styles.title,{fontFamily:'Quicksand'}]}>Thanh toán thất bại hoặc xảy ra lỗi</Text>
        <Text style={[styles.message,{fontFamily:'Quicksand'}]}>Khách hàng thanh toán thất bại</Text>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Quay lại</Text>
        </TouchableOpacity>
        </>
        
        )}
      
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
        position:'absolute',
        top:'40%',
        left:'13%',
        zIndex:1
      
    } ,  modal2: {
      justifyContent: 'center',
      alignItems: 'center',
        position:'absolute',
        top:'40%',
        left:'5%',
        zIndex:1
      
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      borderColor:'#000',
      borderWidth:1,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      fontFamily:'Quicksand'
    },
    message: {
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });