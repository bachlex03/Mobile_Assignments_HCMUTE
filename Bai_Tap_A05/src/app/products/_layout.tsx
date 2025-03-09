import "react-native-gesture-handler";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Header from "@components/Header";

const ProductLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          header: (props) => (
            <Header
              {...props}
              containerStyles="bg-white"
              handleToggleDrawer={() => {
                props.navigation.toggleDrawer();
              }}
            />
          ),
        }}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "overview",
            headerShown: true,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default ProductLayout;
