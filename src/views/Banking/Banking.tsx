import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";

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

  const mainStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: y.value }],
    };
  });

  return (
    <SafeAreaView style={styles.root}>
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
        <View style={styles.container}>
          <Header />

          <Animated.View style={[styles.main, mainStyle]}>
            <AddCard />
            <Cards />
            <Footer />
          </Animated.View>
        </View>
      </AnimatedValueProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
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
