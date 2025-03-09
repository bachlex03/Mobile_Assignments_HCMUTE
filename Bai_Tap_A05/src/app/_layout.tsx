import "~/global.css";

import React, { useEffect } from "react";
import { Platform, Text } from "react-native";
import { persistStore } from "redux-persist";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import rtkStore from "~/src/infrastructure/redux/store";
import { ReduxProvider } from "~/src/infrastructure/redux/provider";

const persistor = persistStore(rtkStore);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "TenorSans-Regular": require("assets/fonts/TenorSans-Regular.ttf"),
    "Poppins-Black": require("assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("assets/fonts/Poppins-Thin.ttf"),
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
            headerShown: false,
          }}
        />
      </Stack>
    </ReduxProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
