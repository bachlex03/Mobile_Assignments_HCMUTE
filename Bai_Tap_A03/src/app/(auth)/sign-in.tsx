// screens/SignIn.tsx
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormType, loginResolver } from "~/src/domain/schemas/auth.schema";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "~/src/components/layouts/AuthLayout";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

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
      email: "",
      password: "",
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
    }
  };

  return (
    <SafeAreaView>
      <AuthLayout>
        <View className="px-5 py-5">
          <Text>SignIn</Text>

          <Label id="inputLabel" className="mt-5">
            Email
          </Label>
          <Input
            name="email"
            control={control}
            error={errors.email}
            placeholder="Write some stuff..."
            className="mt-5"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Add Password Input */}
          <Label id="passwordLabel" className="mt-5">
            Password
          </Label>
          <Input
            name="password"
            control={control}
            error={errors.password}
            placeholder="Enter password..."
            className="mt-5"
            secureTextEntry
          />

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className={`bg-black p-2 rounded-lg w-96 mt-4 ${
              isSubmitting ? "opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            <Text className="text-center text-white font-bold">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </AuthLayout>
    </SafeAreaView>
  );
};

export default SignIn;
