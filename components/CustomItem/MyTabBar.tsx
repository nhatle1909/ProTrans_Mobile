import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View,Animated } from "react-native";

export function MyTabBar({ state, descriptors, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(state.index);
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const   
 tabBarScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setSelectedIndex(state.index);

    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(tabBarScale, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        Animated.spring(opacity, { toValue: 1, useNativeDriver:   
 true }),
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
        Animated.spring(tabBarScale, { toValue: 1, useNativeDriver: true }),
      ]).start();
    });
  }, [state.index]);
  const iconsArray = [
    {
      id: 1,
      routeName: 'GetDocument',
      name: 'local-shipping',
      Icon: MaterialIcons,
      size: 32,
    },
  {
    id: 2,
    routeName: 'Shipping',
    name: 'local-shipping',
    Icon: MaterialIcons,
    size: 32,
  },
  {
    id: 3,
    routeName: 'Notarization',
    name: 'notifications',
    Icon: Ionicons,
    size: 32,
  },
  {
    id: 4,
    routeName: 'GoToNotarize',
    name: 'notifications',
    Icon: Ionicons,
    size: 32,
  },
];
      
    return (
      <View style={style.tabbar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
        
          const currentIcon = iconsArray[index];
          const iconColor = isFocused ? '#40B59F' : '#999'; 
          return (
            <Animated.View
            style={[style.item, { transform: [{ scale }], opacity }]}
          >
            <TouchableOpacity
                 key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
             {currentIcon && (
              <currentIcon.Icon name={currentIcon.name} size={currentIcon.size}   color={iconColor} style={{padding:3}} />
            )}           
            </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    );
  }
  const style = StyleSheet.create({
    tabbar:{
      position: 'absolute',
      bottom: 10,
      flexDirection: 'row',
      marginHorizontal: '5%',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      borderRadius: 30,
      paddingVertical: 15,
      shadowColor: '#000', // Màu của bóng
      shadowOffset: {
        width: 2,
        height: 2, // Độ dịch chuyển theo chiều dọc
      },
      shadowOpacity: 0.3, // Độ mờ của bóng
      shadowRadius: 5, // Bán kính của bóng
      elevation: 5, 

        
    },
    item:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:5,
   
    }
  }) 
