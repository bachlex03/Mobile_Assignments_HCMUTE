import { View, Text } from "react-native";
import React from "react";
import OtpInput from "~/components/ui/opt-input";
import { useSearchParams } from "expo-router/build/hooks";

const OtpScreen = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  console.log("Query param:", q);

  const handleOTPComplete = (otp) => {
    console.log("OTP entered:", otp);
    // Here, you would typically verify the OTP with your backend
  };

  return (
    <View className="flex-1">
      <OtpInput onOTPComplete={handleOTPComplete} />
    </View>
  );
};

export default OtpScreen;
