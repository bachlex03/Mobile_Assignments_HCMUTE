import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormType, loginResolver } from "~/src/domain/schemas/auth.schema";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "~/src/components/layouts/AuthLayout";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { router } from "expo-router";
import { useLoginAsyncMutation } from "~/src/infrastructure/redux/apis/auth.api";
import Modal from "react-native-modal"; // Import modal

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  const [login, { isLoading: isLoggingIn }] = useLoginAsyncMutation();

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

  const handleLogin = async (data: LoginFormType) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap(); // Use .unwrap() to handle success/failure explicitly

      // If we reach here, login was successful (status 200)
      router.replace("/profile"); // Redirect to /profile on success
      reset(); // Reset form after successful login
    } catch (error: any) {
      // Handle error (e.g., 400 Bad Request)
      // console.error("Login failed:", error);
      const errorMsg =
        error?.data?.message ||
        "An unexpected error occurred. Please try again.";
      setErrorMessage(errorMsg); // Set error message for modal
      setIsModalVisible(true); // Show the modal
    }
  };

  const onSubmit: SubmitHandler<LoginFormType> = async (
    data: LoginFormType
  ) => {
    setIsSubmitting(true);
    await handleLogin(data); // Call handleLogin and let it handle success/failure
    setIsSubmitting(false); // Reset submitting state after completion
  };

  return (
    <AuthLayout>
      <View className="flex items-center justify-center h-full px-5">
        <Text className="text-4xl font-bold font-TenorSans-Regular">Login</Text>
        <View className="w-full mt-2">
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
              isSubmitting || isLoggingIn ? "opacity-50" : ""
            }`}
            disabled={isSubmitting || isLoggingIn}
          >
            <Text className="text-xl font-bold text-center text-white">
              {isSubmitting || isLoggingIn ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Error Modal */}
        <Modal isVisible={isModalVisible}>
          <View className="p-5 bg-white rounded-lg">
            <Text className="text-lg font-bold text-red-500">Login Failed</Text>
            <Text className="mt-2">{errorMessage}</Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="p-2 mt-4 bg-blue-500 rounded"
            >
              <Text className="text-center text-white">Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </AuthLayout>
  );
};

export default SignIn;
