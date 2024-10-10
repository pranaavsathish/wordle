import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const ShakeBox = () => {
  // Step 1: Create a shared value for the X translation
  const translateX = useSharedValue(0);

  // Step 2: Define the animated style using the shared value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // Step 3: Start the shaking animation when the component mounts
  useEffect(() => {
    // Set up the shaking effect
    translateX.value = withRepeat(withTiming(10, { duration: 50 }), 6, true);
  }, [translateX]);

  const [flipped, setFlipped] = useState(false);
  const rotation = useSharedValue(0);

  const flipCard = () => {
  rotation.value = withTiming(flipped ? 0 : 1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
  });
  setFlipped(!flipped);
  };

  const animatedStyleFlip = useAnimatedStyle(() => {
  const rotateX = rotation.value * Math.PI; // 180 degrees in radians
  return {
      transform: [{ rotateX: `${rotateX}rad` }],
  };
  });

  return (
    <View style={styles.container}>

      <Animated.View style={[styles.box, animatedStyleFlip]} >
        <Text className=''>N</Text>
      </Animated.View>

      <Button title="press" onPress={() => flipCard()} />
    </View>
  );
};

// Step 4: Define styles for the box and container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

export default ShakeBox;
