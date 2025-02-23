import { View, Text, ScrollView } from "react-native";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView>
      <View>
        <Text>Auth Layout</Text>
        {children}
      </View>
    </ScrollView>
  );
};

export default AuthLayout;
