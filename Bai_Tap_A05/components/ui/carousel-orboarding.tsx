import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import React, { useRef, useState } from "react";

type CarouselItemsProps = {
  items: React.ReactNode[];
};

const { 
	width: SCREEN_WIDTH,
	// height: SCREEN_HEIGHT,
} = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH; // Same as card width in styles
// const CARD_HEIGHT = SCREEN_HEIGHT; // Same as card width in styles

const CarouselOnboarding = ({ items }: CarouselItemsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
	const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / CARD_WIDTH);
    setActiveIndex(index);
  };

	const goToSlide = (index: number) => {
    if (index >= 0 && index < items.length) {
      scrollViewRef.current?.scrollTo({ x: index * CARD_WIDTH, animated: true });
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
				ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        snapToInterval={CARD_WIDTH} // Card width + margin (mx-2 = 8 * 2)
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={100}
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

			{/* Navigation Buttons */}
			<View className="absolute bottom-4 w-[100%] flex flex-row justify-center gap-40">
        <TouchableOpacity
          onPress={() => goToSlide(activeIndex - 1)}
          style={[styles.button, activeIndex === 0 && styles.disabledButton]}
          disabled={activeIndex === 0}
					
        >
          <Text className="text-white font-TenorSans-Regular text-xl">Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => goToSlide(activeIndex + 1)}
          style={[styles.button, activeIndex === items.length - 1 && styles.disabledButton]}
          disabled={activeIndex === items.length - 1}
        >
          <Text className="text-white font-TenorSans-Regular text-xl">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Tailwind-like styles
const styles = StyleSheet.create({
  container: {
		flex:1,
		width: SCREEN_WIDTH, // Fits screen width
		position:"relative",
    // backgroundColor: "#2DAA9E",
    // paddingVertical: 10, // py-4
    // paddingHorizontal: 5, // px-2
		// alignItems: "center", 
  },
  scrollView: {
		width: SCREEN_WIDTH, 
    // flexGrow: 0,
  },
  card: {
    width: CARD_WIDTH, // w-72
    // marginHorizontal: 8, // mx-2
    // backgroundColor: "#ffffff", // bg-white
    // borderRadius: 12, // rounded-lg
    // padding: 16, // p-4
		// borderWidth:1,
    // elevation: 3,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12, // mt-3
		marginBottom:12,

  },
  indicator: {
    width: 8, // w-2
    height: 8, // h-2
    borderRadius: 4, // rounded-full
    backgroundColor: "#d1d5db", // bg-gray-300
    marginHorizontal: 8, // mx-1
  },
  activeIndicator: {
    backgroundColor: "#DD8560", // bg-gray-800
    width: 12, // w-3
  },
	buttonContainer: {
		position:"absolute",
		bottom:20,
    width: "100%",
    flexDirection: "row",
		justifyContent:"center",
		gap: 200,
  },
  button: {
    backgroundColor: "#DD8560",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#d1d5db",
  },
  // buttonText: {
  //   color: "#fff",
  // },
});

export default CarouselOnboarding;
