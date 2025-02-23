import { View, Text, ScrollView } from "react-native";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView>
      <View className="h-screen bg-slate-400">{children}</View>
    </ScrollView>
  );
};

export default AuthLayout;
