import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { cn } from "~/lib/utils";

type AppButtonProps = {
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  containerStyles?: string;
  textStyles?: string;
};

const AppButton = (props: AppButtonProps) => {
  const isRenderIconRight = props.icon && props.iconPosition === "right";

  console.log("props", props.onPress);

  if (props.icon && props.iconPosition === "right") {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View
          className={cn(
            "bg-black flex flex-row items-center justify-center gap-3",
            props.containerStyles
          )}
        >
          <Text
            className={cn(
              "text-white font-TenorSans-Regular uppercase text-2xl py-3",
              props.textStyles
            )}
          >
            {props.title}
          </Text>
          {props.icon && props.icon}
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        className={cn(
          "bg-black flex flex-row items-center justify-center gap-3",
          props.containerStyles
        )}
      >
        {props.icon && props.icon}
        <Text
          className={cn(
            "text-white font-TenorSans-Regular uppercase text-2xl py-3",
            props.textStyles
          )}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
