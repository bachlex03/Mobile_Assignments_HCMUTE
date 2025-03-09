import '~/global.css';

import React, { useEffect } from 'react';
import { Platform, Text } from 'react-native';
import { persistStore } from 'redux-persist';
import { Stack } from 'expo-router';
import { PersistGate } from 'redux-persist/integration/react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import rtkStore from '~/src/infrastructure/redux/store';
import { Provider } from 'react-redux';
import { ReduxProvider } from '~/src/infrastructure/redux/provider';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// // Set the animation options. This is optional.
// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });

const persistor = persistStore(rtkStore);

export {
   // Catch any errors thrown by the Layout component.
   ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
   const [fontsLoaded, error] = useFonts({
      'TenorSans-Regular': require('assets/fonts/TenorSans-Regular.ttf'),
      'Poppins-Black': require('assets/fonts/Poppins-Black.ttf'),
      'Poppins-Bold': require('assets/fonts/Poppins-Bold.ttf'),
      'Poppins-ExtraBold': require('assets/fonts/Poppins-ExtraBold.ttf'),
      'Poppins-ExtraLight': require('assets/fonts/Poppins-ExtraLight.ttf'),
      'Poppins-Light': require('assets/fonts/Poppins-Light.ttf'),
      'Poppins-Medium': require('assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Regular': require('assets/fonts/Poppins-Regular.ttf'),
      'Poppins-SemiBold': require('assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Thin': require('assets/fonts/Poppins-Thin.ttf'),
   });

   useEffect(() => {
      if (error) throw error;

      if (fontsLoaded) {
         SplashScreen.hideAsync();
      }
   }, [fontsLoaded, error]);

   if (!fontsLoaded) {
      return null;
   }

   if (!fontsLoaded && !error) {
      return null;
   }

   return (
      <ReduxProvider>
         <Stack
            screenOptions={{
               headerShown: false,
            }}
         >
            <Stack.Screen
               name="index"
               options={{
                  title: 'Onboarding',
                  headerShown: true,
               }}
            />
         </Stack>
      </ReduxProvider>
   );
}

const useIsomorphicLayoutEffect =
   Platform.OS === 'web' && typeof window === 'undefined'
      ? React.useEffect
      : React.useLayoutEffect;
