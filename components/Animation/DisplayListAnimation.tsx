import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useState } from 'react';

const [visible, setVisible] = useState(false);
const [visible2,setVisible2] = useState(false);
const height = useSharedValue(0);
const height2 = useSharedValue(0);

export const animatedStyle = useAnimatedStyle(() => {
  return {
    height: withTiming(height.value, { duration: 500 }),
    overflow: 'hidden',
  };
});
export const animatedStyle2= useAnimatedStyle(() => {
  return {
    height: withTiming(height2.value, { duration: 500 }),
    overflow: 'hidden',
  };
});
export const toggleVisibility1 = () => {
  setVisible(!visible);
  height.value = visible ? 0 : 100
};
export const toggleVisibility2 = () => {
  setVisible2(!visible2);
  height2.value = visible2 ? 0 : 100
};
