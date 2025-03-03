import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { appInfos } from "appInfos";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const SplashScreen = () => {
  const [isShoSplashScreen, setIsShowPlashScreen] = useState(true);
  const [accessToken, setAccessToken] = useState("");

  const { getItem, setItem } = useAsyncStorage("accessToken");

  const checkLogin = async () => {
    const token = await getItem();

    token && setAccessToken(token);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowPlashScreen(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (!isShoSplashScreen && !accessToken) {
      router.replace("/on-boarding");
    }

    if (!isShoSplashScreen && accessToken) {
      router.replace("/home");
    }
  }, [accessToken, isShoSplashScreen]);

  return (
    <ImageBackground
      source={require("../../../assets/images/splash-img.png")}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      imageStyle={{
        flex: 1,
      }}
    >
      <Image
        source={require("../../../assets/images/logo.png")}
        style={{
          width: appInfos.sizes.WIDTH * 0.7,
          resizeMode: "contain",
        }}
      />

      <ActivityIndicator size="large" color="#000" />
    </ImageBackground>
  );
};

export default SplashScreen;
