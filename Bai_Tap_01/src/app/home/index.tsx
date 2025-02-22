import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
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
              Home Screen
            </Text>
          </View>

          <View className="mt-5"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
