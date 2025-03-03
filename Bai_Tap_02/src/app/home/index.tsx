import { View, Text, ScrollView } from "react-native";
import React from "react";
import Button from "~/src/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const HomeScreen = () => {
  return (
    <ScrollView className="flex-1 bg-slate-200">
      <View className="items-center justify-center flex-1">
        <Text className="text-3xl font-TenorSans-Regular">HomeScreen</Text>

        <Button
          label="Logout"
          onPress={async () => {
            await AsyncStorage.removeItem("accessToken");

            router.replace("/sign-in");
          }}
        ></Button>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
