import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import OtpInput from "~/components/ui/opt-input";
import { useSearchParams } from "expo-router/build/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const OtpScreen = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  console.log("Query param:", q);
  3;

  const handleOTPComplete = (otp) => {
    console.log("OTP entered:", otp);
    // Here, you would typically verify the OTP with your backend

    alert("Saving successfully");

    router.push("/profile");
  };

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1">
        <OtpInput onOTPComplete={handleOTPComplete} />
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
