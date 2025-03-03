import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import OtpInput from "~/components/ui/opt-input";
import { useSearchParams } from "expo-router/build/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Modal from "react-native-modal"; // Import react-native-modal
import {
  useRequestToOtpPageAsyncQuery,
  useSendMailAsyncQuery,
  useVerifyPhoneNumberOtpAsyncMutation,
} from "~/src/infrastructure/redux/apis/auth.api";

const OtpScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const _q = searchParams.get("_q");
  const _verify_type = searchParams.get("_verify_type");

  console.log({
    _q,
    _verify_type,
  });

  const {
    data: requestToOtpPageData,
    error: requestToOtpPageError,
    isLoading: requestToOtpPageIsLoading,
  } = useRequestToOtpPageAsyncQuery({
    _q,
    _verify_type,
  });

  const {
    data: sendMailData,
    error: sendMailError,
    isLoading: sendMailIsLoading,
    refetch: sendMailRefetch,
  } = useSendMailAsyncQuery({ _q, _verify_type });

  const [sendVerifyPhoneNumber, { isLoading: sendVerifyPhoneNumberIsLoading }] =
    useVerifyPhoneNumberOtpAsyncMutation();

  // Trigger sendMailRefetch when requestToOtpPageData is available
  useEffect(() => {
    if (requestToOtpPageData) {
      console.log("requestToOtpPageData", requestToOtpPageData);
      sendMailRefetch();
    }
  }, [requestToOtpPageData, sendMailRefetch]);

  const handleOTPComplete = async (otp) => {
    setIsSubmitting(true);
    console.log("OTP entered:", otp);

    try {
      const result = await sendVerifyPhoneNumber({
        q: _q,
        otp: otp,
      }).unwrap(); // Use unwrap to handle success/failure

      console.log("Verification result:", result);
      alert("OTP verified successfully");
      router.push("/profile");
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("OTP verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if the overlay should be visible
  const isLoading =
    requestToOtpPageIsLoading ||
    sendMailIsLoading ||
    sendVerifyPhoneNumberIsLoading ||
    isSubmitting;

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1">
        <OtpInput onOTPComplete={handleOTPComplete} />

        {/* Loading Overlay */}
        <Modal
          isVisible={isLoading}
          animationIn="fadeIn"
          animationOut="fadeOut"
          backdropOpacity={0.5}
          style={styles.modal}
        >
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0, // Ensure the modal takes up the full screen
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  loadingText: {
    marginTop: 10,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OtpScreen;
