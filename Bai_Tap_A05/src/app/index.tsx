import "expo-router/entry";

import { Link, router } from "expo-router";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      router.push("/products");
    }, 500);
  }, []);

  return (
    <SafeAreaView className="bg-[#111111] h-full">
      <View className="w-full h-full">
        <View className="flex items-center justify-center h-full"></View>
      </View>
    </SafeAreaView>
  );
};

export default App;
