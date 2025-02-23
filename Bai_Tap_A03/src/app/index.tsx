import "expo-router/entry";

import Button from "@components/Button";
import { Link, router } from "expo-router";

import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      router.push("/sign-in");
    }, 1000);
  }, []);

  return (
    <SafeAreaView className="bg-[#0D0D0D] h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="flex items-center justify-center h-full">
          <View className="mb-32">
            <Text className="text-white text-xl font-semibold font-Poppins-SemiBold">
              On boarding Screen
            </Text>
          </View>

          <View className="mt-5"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
