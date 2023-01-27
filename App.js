/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, withSpring, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';



const {width, height} = Dimensions.get('screen');

const Circle_Len = 1000;
const Radius = Circle_Len / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const App = () => {

const progressCircle = useSharedValue(1);
const markScale = useSharedValue(1);
const circleOpacity = useSharedValue(0);
const markOpacity = useSharedValue(0);
const animatedProps= useAnimatedProps(() => ({
  strokeDashoffset: Circle_Len * progressCircle.value,
}))

// useEffect(() => {
//   progressCircle.value = withTiming(0, {duration: 3000})
//   markScale.value = withDelay(1000, withSpring(80));
//   circleOpacity.value = withDelay(1000, withTiming(1));
//   markOpacity.value = withDelay(1500, withTiming(1, {duration: 500}) );
// }, []); 

const mountAnimation = () => {
  progressCircle.value = withTiming(0, {duration: 2000})
  markScale.value = withDelay(1000, withSpring(80));
  circleOpacity.value = withDelay(1000, withTiming(1));
  markOpacity.value = withDelay(1500, withTiming(1, {duration: 500}) );
};

const reanimatedStyle = useAnimatedStyle(() => {
  return {
    opacity: circleOpacity.value,
    transform: [{scale: markScale.value}]
  }
})

const tickAnimatedStyle = useAnimatedStyle(() => {
  return {
    opacity: markOpacity.value,
  }
});

  return (
   <View style={styles.container}>
         <TouchableOpacity onPress={mountAnimation} style={{bottom: 80, width: width * 0.7, height: 60, position: 'absolute', backgroundColor: '#54B435', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20, color: 'white', textTransform: 'uppercase'}}>Show Animation</Text>
         </TouchableOpacity>
      <Svg>
        <Circle
        cx = { width / 2}
        cy = { height / 2 }
        r = { Radius }
        stroke="#404258"
        fill="#fff"
        strokeWidth={35}
        />
        <AnimatedCircle
        cx = { width / 2}
        cy = { height / 2}
        r = { Radius}
        stroke="#82CD47"
        strokeWidth={15}
        fill="transparent"
        strokeDasharray={Circle_Len}
        animatedProps={animatedProps}
        strokeLinecap="round"
        />
      </Svg>
      
      
      <Animated.View 
        style={[{
          height: 3,
          position: 'absolute',
          width: 3,
          backgroundColor: '#54B435',
          borderRadius: 150,
        },
        reanimatedStyle,
        ]}/>
      <View 
        style={{
          height: 110,
          position: 'absolute',
          width: 110,
          backgroundColor: 'transparent',
          transform: [{scale: 2}]
        }}>
        <Svg viewBox='0 0 40 40'>
        <AnimatedPath
        d="M12.5 20l5 5 9-9"
        stroke={"#fff"}
        strokeWidth={3}
        fill="#54B435"
        style={tickAnimatedStyle}
        strokeLinecap="round"
        />
      </Svg>
 
        </View>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
