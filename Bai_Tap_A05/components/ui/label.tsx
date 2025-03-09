import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export type LabelProps = {
  text: string;
  variant?: 'default' | 'primary' | 'secondary' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  weight?: 'normal' | 'medium' | 'bold';
  className?: string;
};

const Label = (props: LabelProps) => {
  const variantStyles = {
    default: 'text-gray-700',
    primary: 'text-blue-600',
    secondary: 'text-gray-500',
    error: 'text-red-500',
    success: 'text-green-500',
  };

  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
  };
  return (
    <Text
      className={`
        ${variantStyles[props.variant || 'default']}
        ${sizeStyles[props.size || 'sm']}
        ${weightStyles[props.weight || 'normal']}
        ${props.className}
      `}
    >
      {props.text}
    </Text>
  );
};

export default Label;

