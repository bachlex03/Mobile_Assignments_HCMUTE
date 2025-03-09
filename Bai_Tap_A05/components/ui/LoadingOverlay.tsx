import { View, Text, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import FeatherIcons from 'react-native-vector-icons/Feather';

type LoadingOverlayProps = {
   isLoading: boolean;
};

const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
   const fadeAnim = useRef(new Animated.Value(0.5)).current; // Fade animation
   const rotateAnim = useRef(new Animated.Value(0)).current; // Rotation animation

   useEffect(() => {
      if (isLoading) {
         // Fade animation
         Animated.loop(
            Animated.sequence([
               Animated.timing(fadeAnim, {
                  toValue: 1,
                  duration: 1000,
                  useNativeDriver: true,
               }),
               Animated.timing(fadeAnim, {
                  toValue: 0.5,
                  duration: 600,
                  useNativeDriver: true,
               }),
            ]),
         ).start();

         // Rotation animation
         Animated.loop(
            Animated.timing(rotateAnim, {
               toValue: 1,
               duration: 2000, // Full rotation in 1 second
               useNativeDriver: true,
            }),
         ).start();
      }
   }, [isLoading, fadeAnim, rotateAnim]);

   if (!isLoading) return null;

   const rotate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'], // Full 360° rotation
   });

   return (
      <View style={styles.overlay}>
         <Animated.View style={{ opacity: fadeAnim, transform: [{ rotate }] }}>
            <FeatherIcons name="loader" size={40} color="#ffffff" />
         </Animated.View>
         <Text style={styles.text} className="text-lg font-TenorSans-Regular ">
            Loading...
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
   },

   text: {
      marginTop: 10,
      fontSize: 18,
      color: '#ffffff',
      fontWeight: '500',
   },
});

export default LoadingOverlay;
