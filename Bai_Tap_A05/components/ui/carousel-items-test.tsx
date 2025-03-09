import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";

type CarouselItemsProps = {
  items: React.ReactNode[];
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = 341; // Same as card width in styles

const CarouselItemsTest = ({ items }: CarouselItemsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / CARD_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        snapToInterval={CARD_WIDTH + 16} // Card width + margin (mx-2 = 8 * 2)
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {items.map((item, index) => (
          <View key={index} style={styles.card}>
            {item}
          </View>
        ))}
      </ScrollView>

      {/* Indicators */}
      <View style={styles.indicatorContainer}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              activeIndex === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// Tailwind-like styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16, // py-4
    paddingHorizontal: 8, // px-2
  },
  scrollView: {
    flexGrow: 0,
  },
  card: {
    width: CARD_WIDTH, // w-72
    marginHorizontal: 8, // mx-2
    // backgroundColor: "#ffffff", // bg-white
    borderRadius: 12, // rounded-lg
    // padding: 16, // p-4
    shadowColor: "#000", // shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12, // mt-3
  },
  indicator: {
    width: 8, // w-2
    height: 8, // h-2
    borderRadius: 4, // rounded-full
    backgroundColor: "#d1d5db", // bg-gray-300
    marginHorizontal: 4, // mx-1
  },
  activeIndicator: {
    backgroundColor: "#DD8560", // bg-gray-800
    width: 12, // w-3
  },
});

export default CarouselItemsTest;
