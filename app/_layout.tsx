import { Stack } from 'expo-router';

function RootLayoutNav() {

  return (
      <Stack initialRouteName='game'>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="game" options={{ presentation: 'modal' }} />
        <Stack.Screen name="animated" options={{ presentation: 'modal' }} />
        <Stack.Screen name="win" options={{ presentation: 'modal' }} />
      </Stack>
  );
}
