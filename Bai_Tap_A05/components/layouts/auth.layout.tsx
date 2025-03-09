import { View, Text } from "react-native";
import React, { ReactNode } from "react";

const AuthLayout = ({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <View className={`flex-1 bg-white ${className}`}>{children}</View>;
};

export default AuthLayout;
