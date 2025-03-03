import "expo-router/entry";

import Button from "@components/Button";

import { View } from "react-native";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/splash-screen");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default App;
