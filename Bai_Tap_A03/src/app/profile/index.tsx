import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { router } from "expo-router";
import {
  ProfileFormType,
  profileResolver,
} from "~/src/domain/schemas/profile.schema";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal"; // Import Modal if using react-native-modal

const ProfileScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState<string | null>(
    "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg"
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for preview image
  const [isPreviewVisible, setIsPreviewVisible] = useState(false); // State for preview modal visibility
  const [isLoading, setIsLoading] = useState(false); // Loading state for image picking

  // Store original values to compare with current form values, including image
  const [originalValues, setOriginalValues] = useState({
    email: "test@gmail.com",
    phoneNumber: "0816429848",
    profileImage:
      "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg",
  });

  const pickImage = async () => {
    setIsLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPreviewImage(result.assets[0].uri); // Set the selected image for preview
        setIsPreviewVisible(true); // Show preview modal
      }
    } catch (error) {
      console.log("Error picking image:", error);
      alert("Failed to pick image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmImage = () => {
    if (previewImage) {
      setImage(previewImage); // Set the preview image as the profile image
      setPreviewImage(null); // Clear preview
      setIsPreviewVisible(false); // Hide preview modal
    }
  };

  const cancelImage = () => {
    setPreviewImage(null); // Clear preview
    setIsPreviewVisible(false); // Hide preview modal
  };

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    watch,
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
      currentValues.phoneNumber !== originalValues.phoneNumber ||
      (image && image !== originalValues.profileImage) // Check if image has changed
    );
  };

  const onSubmit: SubmitHandler<ProfileFormType> = async (
    data: ProfileFormType
  ) => {
    setIsSubmitting(true);
    try {
      // Create FormData to send image and form data
      const formData = new FormData();

      // Add text fields (email and phoneNumber)
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);

      // Add image if it exists and has changed
      if (image && image !== originalValues.profileImage) {
        const fileName = image.split("/").pop() || "profile.jpg";
        const fileType = "image/jpeg"; // Adjust based on your image type (e.g., 'image/png')
        formData.append("profileImage", {
          uri: image,
          name: fileName,
          type: fileType,
        } as any); // Type assertion for FormData compatibility
      }

      // Send request to server
      const response = await fetch("https://your-api-endpoint/update-profile", {
        // Replace with your server URL
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();
      if (response.ok) {
        alert("Profile updated successfully");
        console.log(result);

        // Update original values after successful submission, including image
        setOriginalValues({
          email: data.email,
          phoneNumber: data.phoneNumber,
          profileImage: image || originalValues.profileImage, // Update with new image if changed
        });
      } else {
        throw new Error(result.message || "Failed to update profile");
      }
    } catch (error) {
      alert(`Profile update failed: ${error.message}`);
    } finally {
      console.log("Profile update done");
      setIsSubmitting(false);
      setIsEditing(false);
      router.push(`/otp?q=asdasd.asdas.das123adsd2&email=${data.email}`);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setIsEditing(false);
    // Reset form and image to original values
    reset(originalValues);
    setImage(originalValues.profileImage);
  };

  return (
    <ScrollView>
      <View className="bg-slate-500 h-screen">
        <View className="flex items-center justify-center">
          {image && (
            <Image
              source={{ uri: image }}
              className="h-[200px] w-[200px] rounded-full mt-5"
            />
          )}
          <Button
            title="Pick an image from camera roll"
            onPress={pickImage}
            disabled={isLoading}
          />
          {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
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

        {/* Image Preview Modal */}
        <Modal
          isVisible={isPreviewVisible}
          onBackdropPress={cancelImage} // Close modal by tapping outside
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={{ margin: 0 }}
        >
          <View className="bg-white p-4 rounded-lg h-[80%] justify-center items-center">
            {previewImage && (
              <Image
                source={{ uri: previewImage }}
                className="h-[300px] w-[300px] rounded-lg mb-4"
              />
            )}
            <Text className="text-lg font-bold mb-4">Preview Image</Text>
            <View className="flex-row justify-between w-full">
              <TouchableOpacity
                onPress={cancelImage}
                className="bg-red-500 px-4 py-2 rounded-lg w-[48%]"
              >
                <Text className="text-white text-center font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmImage}
                className="bg-green-500 px-4 py-2 rounded-lg w-[48%]"
              >
                <Text className="text-white text-center font-bold">
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
