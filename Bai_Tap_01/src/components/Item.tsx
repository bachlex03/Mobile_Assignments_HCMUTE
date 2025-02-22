import { StyleSheet, Text, View } from "react-native";
import React from "react";

type ItemProps = {
  label: string;
  text: string;
  icon?: string;
};

const Item = (props: ItemProps) => {
  return (
    <View className="p-5">
      <Text className="font-Poppins-Light opacity-75">{props.label}</Text>
      <Text className="font-TenorSans-Regular text-lg text-primary">
        {props.text}
      </Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({});
