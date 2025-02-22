import "expo-router/entry";

import { Link, router } from "expo-router";

import { ScrollView, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import { images } from "@constants/index";
import Item from "~/components/Item";

const App = () => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      clearInterval(interval);

      router.push("/home");
    }, 10000);

    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
  }, []);

  return (
    <SafeAreaView className="bg-[#0D0D0D] h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="flex items-center flex-col h-full">
          <View className="h-[250px] w-full bg-white flex items-center justify-center">
            <Image
              source={images.avtBg}
              resizeMode="cover"
              className="h-full w-full"
            />

            <Image
              source={images.avt}
              resizeMode="contain"
              className="h-[200px] rounded-full absolute bottom-0"
            />
          </View>
          <View className="bg-white w-full h-full">
            <Item label="Student ID:" text="21110359" />
            <Item label="Fullname:" text="Lê Xuân Bách" />
            <Item label="Email:" text="21110359@student.hcmute.edu.vn" />
            <Item label="Date of Birth:" text="16/08/2003" />
            <Item label="Mobile" text="+82 0816429848" />
            <View className="bg-black h-full w-full mt-16 flex items-center">
              <Text className="text-white font-Poppins-Medium text-lg mt-2">
                Move to Home Screen in: {counter}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
