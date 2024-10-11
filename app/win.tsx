import { View, Text, Image, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {  useFonts, AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { useRouter } from 'expo-router';

const win = () => {
  const names = ['Played','Win %','Current Streak','Max Streak'];
  const router = useRouter();
  const frequencies = [1,5,16,27,10,8];

  const [fontsLoaded] = useFonts({
    AbrilFatface_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const normalize = (frequency: number) => {
    const s:number = frequencies.reduce((acc, val) => acc+val, 0);
    return Math.max(20,Math.round((frequency / s) * 500));
  };

  return (
    <View className='pl-8 pr-8 pt-5'>
      
      <TouchableOpacity onPress={() => router.push('/game')} className='w-full flex flex-row justify-end'>
        <Feather name='x' size={25} color='black' />
      </TouchableOpacity>

      <View className='w-full flex flex-col justify-center items-center space-y-4 mt-5 mb-5'>
        <Image source={require('@/assets/images/win.png')} style={{height: 60, width: 60}} />
        <Text className='text-3xl' style={{fontFamily: 'AbrilFatface_400Regular'}}>Congratulations!</Text>
      </View>

      <View className='space-y-3 mt-2'>
        <Text className='font-bold text-sm'>STATISTICS</Text>
        <View className='w-full flex flex-row justify-around'>
          {
            names.map((name) => 
              <View key={name} className='flex flex-col items-center w-14 justify-center'>
                <Text className='font-normal text-2xl'>67</Text>
                <Text className='font-normal text-xs text-center h-10'>{name}</Text>
              </View>
            )
          }
        </View>  
      </View> 

      <View className='w-full h-[30vh] mt-4 border-b-[1px] border-b-slate-200'>
        <Text className='font-bold text-sm'>GAME STATISTICS</Text>

        <View className='flex flex-row mt-4 gap-x-3'>

          <View className='flex gap-y-2'>
            {
              [1,2,3,4,5,6].map((item) => <Text key={item} className='text-xs font-bold h-[18px]'>{item}</Text>)
            }
          </View>

          <View className='flex-1 flex gap-y-2'>
            {
              [0,1,2,3,4,5].map((i) => <Text key={i} className='bg-[#58A351] text-xs font-bold h-[18px] text-white text-right pr-2' style={{width: normalize(frequencies[i])}}>{frequencies[i]}</Text>)
            }
          </View>

        </View>

      </View>

      <View className='flex flex-row justify-center mt-5'>
        <TouchableOpacity className='bg-[#58A351] flex flex-row justify-center items-center w-48 pt-3 pb-3 rounded-full space-x-2'>
          <Text className='text-white font-semibold text-base'>Share</Text>
          <Ionicons name="share-social-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default win;