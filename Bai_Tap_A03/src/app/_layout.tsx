import "../../global.css";
import React, { useEffect, useRef, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Text, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { persistStore } from "redux-persist";
import rtkStore from "~/src/infrastructure/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { StatusBar } from "expo-status-bar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import {
  Theme,
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

const persistor = persistStore(rtkStore);

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
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

  const hasMounted = useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      document.documentElement.classList.add("bg-background");
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    if (fontError) throw fontError;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Render nothing until both fonts and color scheme are loaded
  if (!fontsLoaded || !isColorSchemeLoaded) {
    return null;
  }

  return (
    <Provider store={rtkStore}>
      <PersistGate
        loading={<Text>Loading persisted data... !!!!</Text>}
        persistor={persistor}
      >
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <SafeAreaProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;
