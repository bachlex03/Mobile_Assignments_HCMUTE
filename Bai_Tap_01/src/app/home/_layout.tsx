import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const HomeLayout = () => {
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

export default HomeLayout;

const styles = StyleSheet.create({});
