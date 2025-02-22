import "../../global.css";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../../tamagui.config";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

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
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const colorScheme = useColorScheme();

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
    <SafeAreaProvider className="">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
