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
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-6 text-gray-800">Enter OTP</Text>
      <View className="flex-row justify-between w-4/5 mb-6">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl bg-gray-50"
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
        className="bg-blue-500 p-3 rounded-lg"
        onPress={() => console.log("Resend OTP pressed")}
      >
        <Text className="text-white text-base font-semibold">Resend OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white p-3 rounded-lg mt-4"
        onPress={() => router.back()}
      >
        <Text className="text-black border-b text-base font-semibold">
          Back to profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpInput;
