import React from "react";
import { StyleSheet, View, Dimensions, LayoutChangeEvent } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnimatedValueProvider, PageLayoutProvider } from "./context";
import {
  HEADER_HEIGHT,
  HEADER_BOTTOM_SPACING,
  HEADER_TOP_SPACING,
} from "./measurements";
import Header from "./Header";
import Footer from "./Footer";
import Cards from "./Cards";
import AddCard from "./AddCard";

function Banking() {
  const x = useSharedValue<number>(0);
  const y = useSharedValue<number>(0);
  const isSwipingHorizontal = useSharedValue<number>(0);
  const isSwipingVertical = useSharedValue<number>(0);
  const hasExpanded = useSharedValue<number>(0);
  const activeIndex = useSharedValue<number>(0);

  const [layout, setLayout] = React.useState({
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  });

  const inset = useSafeAreaInsets();

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setLayout({ width, height });
  };

  const mainStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: y.value }],
    };
  });

  return (
    <View style={[styles.root, { top: inset.top }]}>
      <AnimatedValueProvider
        value={{
          x,
          y,
          activeIndex,
          hasExpanded,
          isSwipingHorizontal,
          isSwipingVertical,
        }}
      >
        <View style={styles.container} onLayout={handleLayout}>
          <PageLayoutProvider value={layout}>
            <Header />

            <Animated.View style={[styles.main, mainStyle]}>
              <AddCard />
              <Cards />
              <Footer />
            </Animated.View>
          </PageLayoutProvider>
        </View>
      </AnimatedValueProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: "white",
    position: "relative",
  },
  container: {
    flex: 1,
    position: "relative",
    paddingTop: HEADER_BOTTOM_SPACING + HEADER_TOP_SPACING + HEADER_HEIGHT,
  },
  main: {
    flex: 1,
    zIndex: 20,
    // transform: [{ translateY: 20 }],
  },
});

export default Banking;
