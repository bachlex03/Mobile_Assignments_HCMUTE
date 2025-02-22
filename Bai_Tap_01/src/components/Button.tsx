import { StyleSheet, Text, View } from "react-native";
import React from "react";

type ButtonProps = {
  label?: string;
  onPress?: () => void;
  containerStyles?: string;
  children: React.ReactNode;
};

const Button = (props: ButtonProps) => {
  return (
    <View className="bg-blue-400 px-5 py-2 rounded-md">{props.children}</View>
  );
};

export default Button;

const styles = StyleSheet.create({});
