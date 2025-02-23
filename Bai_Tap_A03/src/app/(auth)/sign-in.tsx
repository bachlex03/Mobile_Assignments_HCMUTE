// screens/SignIn.tsx
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormType, loginResolver } from "~/src/domain/schemas/auth.schema";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "~/src/components/layouts/AuthLayout";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { router } from "expo-router";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormType>({
    resolver: loginResolver,
    defaultValues: {
      email: "user@gmail.com",
      password: "1",
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (
    data: LoginFormType
  ) => {
    setIsSubmitting(true); // Set to true at start
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Login success");
      console.log(data);
      // reset();
    } catch (error) {
      alert("Login failed");
    } finally {
      console.log("Login done");
      setIsSubmitting(false); // Reset submitting state
      router.push("/profile");
    }
  };

  return (
    // <SafeAreaView>
    <AuthLayout>
      <View className="px-5 flex h-full items-center justify-center">
        <Text className="text-4xl font-bold font-TenorSans-Regular">Login</Text>
        <View className="mt-2 w-full">
          <Label id="inputLabel" className="">
            Email
          </Label>
          <Input
            name="email"
            control={control}
            error={errors.email}
            placeholder="email"
            className=""
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Add Password Input */}
          <View className="mt-2">
            <Label id="passwordLabel" className="mt-5">
              Password
            </Label>
            <Input
              name="password"
              control={control}
              error={errors.password}
              placeholder="password"
              className=""
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className={`bg-black px-2 py-4 rounded-lg w-full mt-4 ${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            <Text className="text-center text-white font-bold text-xl">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
    // </SafeAreaView>
  );
};

export default SignIn;
