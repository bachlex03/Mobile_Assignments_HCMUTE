import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      initialRouteName="on-boarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="on-boarding"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
