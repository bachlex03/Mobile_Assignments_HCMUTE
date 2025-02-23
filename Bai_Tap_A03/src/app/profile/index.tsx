import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { router } from "expo-router";
import {
  ProfileFormType,
  profileResolver,
} from "~/src/domain/schemas/profile.schema";

const ProfileScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Store original values to compare with current form values
  const [originalValues, setOriginalValues] = useState({
    email: "test@gmail.com",
    phoneNumber: "0816429848",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields }, // Use dirtyFields to track changed fields
    reset,
    watch, // Watch current form values for comparison
  } = useForm<ProfileFormType>({
    resolver: profileResolver,
    defaultValues: {
      email: "test@gmail.com",
      phoneNumber: "0816429848",
    },
  });

  // Watch current form values to compare with original values
  const currentValues = watch();

  // Determine if there are changes by comparing currentValues with originalValues
  const hasChanges = () => {
    return (
      currentValues.email !== originalValues.email ||
      currentValues.phoneNumber !== originalValues.phoneNumber
    );
  };

  const onSubmit: SubmitHandler<ProfileFormType> = async (
    data: ProfileFormType
  ) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      alert("Login success");
      console.log(data);

      // Update original values after successful submission
      setOriginalValues({
        email: data.email,
        phoneNumber: data.phoneNumber,
      });
    } catch (error) {
      alert("Login failed");
    } finally {
      console.log("Login done");
      setIsSubmitting(false);
      setIsEditing(false);
      router.push(`/otp?q=asdasd.asdas.das123adsd2&email=${data.email}`);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    reset(originalValues);
  };

  return (
    <ScrollView>
      <View className="bg-slate-500 h-screen">
        <View className="flex items-center justify-center">
          <Image
            className="h-[200px] w-[200px] rounded-full mt-5"
            source={{
              uri: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg",
            }}
          />
        </View>

        <View className="px-5 py-5 mx-5 bg-slate-200 rounded-md mt-10">
          <Label id="inputLabel" className="">
            Email
          </Label>
          <Input
            name="email"
            control={control}
            error={errors.email}
            placeholder="email"
            className=""
            editable={isEditing}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Phone number Input */}
          <View className="mt-2">
            <Label id="passwordLabel" className="mt-5">
              Phone number
            </Label>
            <Input
              name="phoneNumber"
              control={control}
              error={errors.phoneNumber}
              placeholder="phone number"
              editable={isEditing}
              className=""
            />
          </View>

          {isEditing ? (
            <View className="mt-4 flex-row justify-between">
              {/* Cancel Button */}
              <TouchableOpacity
                onPress={handleCancel}
                className="bg-red-500 px-2 py-4 rounded-lg w-[48%] disabled:opacity-50"
                disabled={isSubmitting}
              >
                <Text className="text-center text-white font-bold text-xl">
                  Cancel
                </Text>
              </TouchableOpacity>

              {/* Save Button (only shown if there are changes) */}
              {hasChanges() ? (
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className={`bg-black px-2 py-4 rounded-lg w-[48%] ${
                    isSubmitting ? "opacity-50" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  <Text className="text-center text-white font-bold text-xl">
                    Save
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              className={`bg-black px-2 py-4 rounded-lg w-full mt-4 ${
                isSubmitting ? "opacity-50" : ""
              }`}
              disabled={isSubmitting}
            >
              <Text className="text-center text-white font-bold text-xl">
                Edit Profile
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
