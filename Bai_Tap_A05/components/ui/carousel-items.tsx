import _ from "lodash";
import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import {
  Constants,
  Spacings,
  View,
  Text,
  Carousel,
  Image,
  Colors,
} from "react-native-ui-lib";

import { ReactNode } from "react";

const BACKGROUND_COLORS = [
  Colors.red50,
  Colors.yellow20,
  Colors.purple50,
  Colors.green50,
  Colors.cyan50,
  Colors.purple20,
  Colors.blue60,
  Colors.red10,
  Colors.green20,
  Colors.purple60,
];

const Page = ({
  children,
  style,
  ...others
}: {
  children: ReactNode;
  style?: object;
}) => {
  return (
    <View
      {...others}
      style={[{ flex: 1, borderWidth: 1, borderRadius: 8, width: 341 }, style]}
    >
      {children}
    </View>
  );
};

const CarouselItems = () => {
  return (
    <View>
      <View style={{ width: 400 }} className="ml-3">
        <Carousel
          pageWidth={400 - Spacings.s5 * 1}
          itemSpacings={Spacings.s3}
          containerMarginHorizontal={Spacings.s2}
          initialPage={2}
          containerStyle={{ height: 160 }}
          pageControlPosition={Carousel.pageControlPositions.UNDER}
          pageControlProps={{}}
        >
          {_.map([...Array(10)], (_item, index) => (
            <Page
              style={{ backgroundColor: BACKGROUND_COLORS[index] }}
              key={index}
            >
              <Text margin-15>CARD {index}</Text>
            </Page>
          ))}
        </Carousel>
      </View>
    </View>
  );
};

export default CarouselItems;

const styles = StyleSheet.create({});
