import * as React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { TextInput, type TextInputProps, Text, View, Image } from "react-native";
import Label from "~/components/ui/label";
import { cn } from "~/lib/utils";

interface InputFieldProps extends TextInputProps {
  name: string;
  control: Control<any>;
  error?: FieldError;
  label?: string;
  labelStyles?: string;
  errorStyles?: string;
  containerStyles?: string;
  Icon?: any;
}

const InputField = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  InputFieldProps
>(
  (
    {
      name,
      control,
      error,
      label,
      labelStyles,
      className,
      errorStyles,
      containerStyles,
      placeholderClassName,
      Icon,
      ...props
    },
    ref
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View className={`${containerStyles} w-full h-16 border rounded-2xl`}>
              {Icon? (
                <View className="w-full h-full flex flex-row items-center pl-3 ">
                  <Icon
                    height = {35}
                    width = {35}
                  />
                  <TextInput
                    id={name}
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className={cn(
                      "w-[290px] h-full pl-2 text-xl text-foreground",
                      props.editable === false &&
                        "opacity-50 web:cursor-not-allowed",
                      className
                    )}
                    placeholderClassName={cn(
                      "text-muted-foreground",
                      placeholderClassName
                    )}
                    {...props}
                  />
                </View>
              ):(
                <View className="w-full h-fit">
                  {label&&
                    <Label className={`mb-2 ${labelStyles}`} text={label}/>
                  }
                  <TextInput
                  id={name}
                  ref={ref}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className={cn(
                    "w-[290px] h-full pl-2 text-xl text-foreground",
                    props.editable === false &&
                      "opacity-50 web:cursor-not-allowed",
                    className
                  )}
                  placeholderClassName={cn(
                    "text-muted-foreground",
                    placeholderClassName
                  )}
                  {...props}
                  />
                </View>
              )}
              {error && (
                <Text className={`text-red-500 mt-2 ${errorStyles}`}>
                  {error.message}
                </Text>
              )}
            </View>
          );
        }}
      />
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
