import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Swiper from "react-native-swiper";
import { appInfos } from "~/appInfos";
import { router } from "expo-router";

const OnBoardingScreen = () => {
  const [index, setIndex] = useState(0);
  return (
    <View className="flex-1">
      <Swiper
        style={{}}
        loop={false}
        onIndexChanged={(index) => setIndex(index)}
        index={index}
        activeDotColor="#fff"
      >
        <Image
          source={require("../../../assets/images/onboarding-1.png")}
          style={{
            flex: 1,
            width: appInfos.sizes.WIDTH,
            height: appInfos.sizes.HEIGHT,
            resizeMode: "cover",
          }}
        />
        <Image
          source={require("../../../assets/images/onboarding-2.png")}
          style={{
            flex: 1,
            width: appInfos.sizes.WIDTH,
            height: appInfos.sizes.HEIGHT,
            resizeMode: "cover",
          }}
        />
      </Swiper>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          height: 100,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.replace("/sign-in");
          }}
        >
          <Text className="text-xl text-white font-TenorSans-Regular">
            Skip
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            index < 2 ? setIndex(index + 1) : router.replace("/sign-in");
          }}
        >
          <Text className="text-xl text-white font-TenorSans-Regular">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
