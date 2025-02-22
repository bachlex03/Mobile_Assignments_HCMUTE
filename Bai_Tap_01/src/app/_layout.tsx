import "../../global.css";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
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
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
