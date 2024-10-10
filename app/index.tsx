import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const index = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
        router.push('./game')
      }, 100);
  
      return () => clearTimeout(timer);
  }, []);

  return (
    <View className=''>
      <Text>index</Text>
      <Button title='go to game' onPress={() => router.push('./game')} />
    </View>
  )
}

export default index;