import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import { router } from "expo-router";

const OtpInput = ({ onOTPComplete }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array for 6 OTP digits
  const inputRefs = useRef([]);

  // Handle input change for each OTP digit
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, ""); // Only allow numbers
    setOtp(newOtp);

    // Move focus to the next input if a digit is entered
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if OTP is complete
    if (newOtp.every((digit) => digit.length === 1)) {
      const otpString = newOtp.join("");
      onOTPComplete(otpString); // Callback with the complete OTP
    }
  };

  // Handle backspace or clearing input
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View className="items-center justify-center flex-1 p-4 bg-white">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Enter OTP</Text>
      <View className="flex-row justify-between w-4/5 mb-6">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="w-12 h-12 text-xl text-center border border-gray-300 rounded-lg bg-gray-50"
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            autoFocus={index === 0} // Auto-focus on the first input
          />
        ))}
      </View>
      <TouchableOpacity
        className="p-3 bg-blue-500 rounded-lg"
        onPress={() => console.log("Resend OTP pressed")}
      >
        <Text className="text-base font-semibold text-white">Resend OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="p-3 mt-4 bg-white rounded-lg"
        onPress={() => router.back()}
      >
        <Text className="text-base font-semibold text-black border-b">
          Back to profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpInput;
