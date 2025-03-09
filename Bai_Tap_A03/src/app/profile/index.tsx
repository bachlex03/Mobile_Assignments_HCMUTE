import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { router } from "expo-router";
import {
  ProfileFormType,
  profileResolver,
} from "~/src/domain/schemas/profile.schema";
import {
  PhoneNumberFormType,
  phoneNumberResolver,
} from "~/src/domain/schemas/phone.schema";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import {
  useChangePhoneNumberAsyncMutation,
  useGetUserProfileAsyncQuery,
  useUpdateUserProfileAsyncMutation,
} from "~/src/infrastructure/redux/apis/user.api";
import getQueryParams from "~/src/infrastructure/utils/get-query-params";
import { createQueryEncodedUrl } from "~/src/infrastructure/utils/query-encoded-url";

const ProfileScreen = () => {
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPhone, setIsSubmittingPhone] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [image, setImage] = useState<string | null>(
    "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg"
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: userProfile, refetch: refetchUserProfile } =
    useGetUserProfileAsyncQuery(undefined);

  const [changePhoneNumber, { isLoading: isChangingPhoneNumber }] =
    useChangePhoneNumberAsyncMutation();

  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateUserProfileAsyncMutation();

  // Form for profile (firstName, lastName)
  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileFormType>({
    resolver: profileResolver,
    defaultValues: {
      profile_firstName: "",
      profile_lastName: "",
    },
  });

  // Form for phone number
  const {
    control: phoneControl,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
    reset: resetPhone,
  } = useForm<PhoneNumberFormType>({
    resolver: phoneNumberResolver,
    defaultValues: {
      phoneNumber: "",
    },
  });

  // Populate forms with user profile data when it loads
  useEffect(() => {
    if (userProfile?.data) {
      const {
        email,
        profile_phoneNumber,
        profile_firstName,
        profile_lastName,
      } = userProfile.data;
      resetProfile({
        profile_firstName: profile_firstName || "",
        profile_lastName: profile_lastName || "",
      });
      resetPhone({
        phoneNumber: profile_phoneNumber || "",
      });
      setImage(userProfile.data.profileImage || image);
    }
  }, [userProfile, resetProfile, resetPhone]);

  const pickImage = async () => {
    setIsLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPreviewImage(result.assets[0].uri);
        setIsPreviewVisible(true);
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
      setImage(previewImage);
      setPreviewImage(null);
      setIsPreviewVisible(false);
    }
  };

  const cancelImage = () => {
    setPreviewImage(null);
    setIsPreviewVisible(false);
  };

  const onProfileSubmit: SubmitHandler<ProfileFormType> = async (data) => {
    setIsSubmittingProfile(true);
    try {
      console.log("Submitting profile data:", {
        profile_firstName: data.profile_firstName,
        profile_lastName: data.profile_lastName,
        ...(image && { profileImage: image }),
      });

      const result = await updateProfile({
        firstName: data.profile_firstName,
        lastName: data.profile_lastName,
      });

      if (result) {
        alert("Profile updated successfully");
      }

      refetchUserProfile();
    } catch (error) {
      alert(`Profile update failed: ${error.message}`);
    } finally {
      setIsSubmittingProfile(false);
      setIsEditingProfile(false);
    }
  };

  const onPhoneNumberSubmit: SubmitHandler<PhoneNumberFormType> = async (
    data
  ) => {
    setIsSubmittingPhone(true);
    try {
      const result = await changePhoneNumber({
        changedPhoneNumber: data.phoneNumber,
      });

      if (result?.data?.redirect) {
        router.push(
          createQueryEncodedUrl("/otp", getQueryParams(result.data.redirect))
        );
      }

      // alert("Phone number updated successfully (mock)");
      // refetchUserProfile();
    } catch (error) {
      alert(`Phone number update failed: ${error.message}`);
    } finally {
      setIsSubmittingPhone(false);
      setIsEditingPhone(false);
    }
  };

  const handleProfileCancel = () => {
    setIsEditingProfile(false);
    resetProfile({
      profile_firstName: userProfile?.data?.profile_firstName || "",
      profile_lastName: userProfile?.data?.profile_lastName || "",
    });
    setImage(userProfile?.data?.profileImage || image);
  };

  const handlePhoneCancel = () => {
    setIsEditingPhone(false);
    resetPhone({
      phoneNumber: userProfile?.data?.profile_phoneNumber || "",
    });
  };

  return (
    <ScrollView>
      <View className="h-screen bg-slate-500">
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
            disabled={isLoading || !isEditingProfile}
          />
          {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
        </View>

        <View className="px-5 py-5 mx-5 mt-10 rounded-md bg-slate-200">
          {/* Email (Non-editable) */}
          <View className="mt-2">
            <Label id="emailLabel" className="">
              Email
            </Label>
            <TextInput
              // name="email"
              // control={profileControl}
              value={userProfile?.data?.email || ""}
              placeholder="email"
              className=""
              editable={false}
            />
          </View>

          {/* Phone Number */}
          <View className="flex-row items-center mt-2">
            <View className="flex-1">
              <Label id="phoneLabel" className="mt-5">
                Phone Number
              </Label>
              <Input
                name="phoneNumber"
                control={phoneControl}
                error={phoneErrors.phoneNumber}
                placeholder="phone number"
                editable={isEditingPhone}
                className=""
                keyboardType="numeric"
              />
            </View>
            {!isEditingPhone ? (
              <TouchableOpacity
                onPress={() => setIsEditingPhone(true)}
                className="px-2 py-1 ml-2 bg-gray-500 rounded"
              >
                <Text className="text-white">Edit</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          {isEditingPhone && (
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={handlePhoneCancel}
                className="bg-red-500 px-2 py-2 rounded-lg w-[48%] disabled:opacity-50"
                disabled={isSubmittingPhone}
              >
                <Text className="text-base font-bold text-center text-white">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePhoneSubmit(onPhoneNumberSubmit)}
                className={`bg-black px-2 py-2 rounded-lg w-[48%] ${
                  isSubmittingPhone ? "opacity-50" : ""
                }`}
                disabled={isSubmittingPhone}
              >
                <Text className="text-base font-bold text-center text-white">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* First Name */}
          <View className="mt-2">
            <Label id="firstNameLabel" className="mt-5">
              First Name
            </Label>
            <Input
              name="profile_firstName"
              control={profileControl}
              error={profileErrors.profile_firstName}
              placeholder="First name"
              editable={isEditingProfile}
              className=""
            />
          </View>

          {/* Last Name */}
          <View className="mt-2">
            <Label id="lastNameLabel" className="mt-5">
              Last Name
            </Label>
            <Input
              name="profile_lastName"
              control={profileControl}
              error={profileErrors.profile_lastName}
              placeholder="Last name"
              editable={isEditingProfile}
              className=""
            />
          </View>

          {isEditingProfile ? (
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={handleProfileCancel}
                className="bg-red-500 px-2 py-4 rounded-lg w-[48%] disabled:opacity-50"
                disabled={isSubmittingProfile}
              >
                <Text className="text-xl font-bold text-center text-white">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleProfileSubmit(onProfileSubmit)}
                className={`bg-black px-2 py-4 rounded-lg w-[48%] ${
                  isSubmittingProfile ? "opacity-50" : ""
                }`}
                disabled={isSubmittingProfile}
              >
                <Text className="text-xl font-bold text-center text-white">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditingProfile(true)}
              className={`bg-black px-2 py-4 rounded-lg w-full mt-4 ${
                isSubmittingProfile ? "opacity-50" : ""
              }`}
              disabled={isSubmittingProfile}
            >
              <Text className="text-xl font-bold text-center text-white">
                Edit Profile
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Image Preview Modal */}
        <Modal
          isVisible={isPreviewVisible}
          onBackdropPress={cancelImage}
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
            <Text className="mb-4 text-lg font-bold">Preview Image</Text>
            <View className="flex-row justify-between w-full">
              <TouchableOpacity
                onPress={cancelImage}
                className="bg-red-500 px-4 py-2 rounded-lg w-[48%]"
              >
                <Text className="font-bold text-center text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmImage}
                className="bg-green-500 px-4 py-2 rounded-lg w-[48%]"
              >
                <Text className="font-bold text-center text-white">
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
