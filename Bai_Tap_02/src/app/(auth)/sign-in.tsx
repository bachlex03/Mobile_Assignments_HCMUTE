import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "~/src/components/layouts/AuthLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const SignInScreen = () => {
  const loginSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email",
    }),
    password: z.string().min(3, {
      message: "Password must be at least 3 characters",
    }),
  });

  type LoginFormType = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<LoginFormType> = async (
    data: LoginFormType
  ) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await AsyncStorage.setItem("accessToken", "bach");

      alert("Login success");
      reset(); // Clear form after successful submission

      // Redirect to home screen
      router.replace("/home");
    } catch (error) {
      alert("Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <AuthLayout>
        <View className="flex items-center justify-center h-screen">
          <Text className="mb-4 text-2xl text-white font-Poppins-Bold">
            Login screen
          </Text>

          <View className="p-2 rounded-lg w-96">
            <Controller
              name="email"
              control={control}
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error },
              }) => (
                <View>
                  <Text className="mb-4 text-lg text-black font-TenorSans-Regular">
                    Email
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange} // Changed from onChange
                    onBlur={onBlur}
                    className="px-3 text-lg leading-[18px] bg-white rounded-md h-[40px]"
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  {errors.email && (
                    <Text className="mt-2 text-sm text-red-800">
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View className="p-2 rounded-lg w-96">
            <Controller
              name="password"
              control={control}
              render={({
                field: { onBlur, onChange, value },
                fieldState: { error },
              }) => (
                <View>
                  <Text className="mb-4 text-lg text-black font-TenorSans-Regular">
                    Password
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange} // Changed from onChange
                    onBlur={onBlur}
                    className="px-3 py-2 text-lg bg-white rounded-md"
                    secureTextEntry
                  />
                  {errors.password && (
                    <Text className="mt-2 text-sm text-red-800">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className={`bg-primary p-2 rounded-lg w-96 mt-4 ${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            <Text className="py-2 font-bold text-center text-white">
              {isSubmitting ? "Submitting..." : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </AuthLayout>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
