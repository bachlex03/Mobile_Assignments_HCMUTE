import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef } from "react";

type PopupModalProps = {
  isVisible: boolean; // Controls modal visibility
  onClose: () => void; // Callback to close the modal
  children: React.ReactNode; // Custom content inside the modal
};

const AppPopupModal = ({ isVisible, onClose, children }: PopupModalProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation value for fade effect

  useEffect(() => {
    if (isVisible) {
      // Fade in when modal opens
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out when modal closes
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, fadeAnim]);

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none" // We'll handle animation manually
      onRequestClose={onClose} // For Android back button
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: fadeAnim, // Apply fade animation to backdrop
            },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Modal Content */}
      <View style={styles.centeredView}>
        <Animated.View
          style={[
            styles.modalView,
            {
              opacity: fadeAnim, // Apply fade animation to modal content
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1], // Slight scale effect
                  }),
                },
              ],
            },
          ]}
        >
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <View style={styles.closeIcon}>
              <View style={styles.closeIconLine1} />
              <View style={styles.closeIconLine2} />
            </View>
          </TouchableOpacity>

          {/* Custom Content */}
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Tailwind-like styles
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // bg-black/50
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalView: {
    width: "90%", // w-[90%]
    maxWidth: 400, // max-w-md
    backgroundColor: "#ffffff", // bg-white
    borderRadius: 0, // rounded-lg
    padding: 16, // p-5
    shadowColor: "#000", // shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10, // top-2.5
    right: 10, // right-2.5
    padding: 4, // p-1
    zIndex: 10,
  },
  closeIcon: {
    width: 16, // w-4
    height: 16, // h-4
    position: "relative",
  },
  closeIconLine1: {
    position: "absolute",
    width: "100%",
    height: 2, // h-0.5
    backgroundColor: "#6b7280", // bg-gray-500
    transform: [{ rotate: "45deg" }],
    top: "50%",
  },
  closeIconLine2: {
    position: "absolute",
    width: "100%",
    height: 2, // h-0.5
    backgroundColor: "#6b7280", // bg-gray-500
    transform: [{ rotate: "-45deg" }],
    top: "50%",
  },
  content: {
    marginTop: 20, // mt-5
  },
});

export default AppPopupModal;
