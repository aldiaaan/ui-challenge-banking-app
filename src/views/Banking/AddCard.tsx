import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  FOOTER_TOP_SPACING,
  FOOTER_HEIGHT,
  FOOTER_BOTTOM_SPACING,
  HEADER_BOTTOM_SPACING,
  HEADER_HEIGHT,
  HEADER_TOP_SPACING,
} from "./measurements";

import { useAnimatedValueContext } from "./context";

const { width, height } = Dimensions.get("window");

function AddCard() {
  const { x } = useAnimatedValueContext();

  const animatedStyle = useAnimatedStyle(() => ({
    // top: interpolate(
    //   x.value,
    //   [width, 0],
    //   [
    //     0,
    //     20 +
    //       height -
    //       (height -
    //         HEADER_HEIGHT -
    //         HEADER_BOTTOM_SPACING -
    //         HEADER_BOTTOM_SPACING),
    //   ],
    //   Extrapolate.CLAMP
    // ),
    // bottom: interpolate(
    //   x.value,
    //   [width, 0],
    //   [
    //     0,
    //     20 +
    //       height -
    //       (height -
    //         HEADER_HEIGHT -
    //         HEADER_BOTTOM_SPACING -
    //         HEADER_BOTTOM_SPACING),
    //   ],
    //   Extrapolate.CLAMP
    // ),
    // borderRadius: interpolate(x.value, [width, 0], [0, 24], Extrapolate.CLAMP),
    // left: interpolate(
    //   x.value,
    //   [-width, 0, width],
    //   [-width, 32, 0],
    //   Extrapolate.CLAMP
    // ),
    // right: interpolate(
    //   x.value,
    //   [-width, 0, width],
    //   [width + 24, 24, 0],
    //   Extrapolate.CLAMP
    // ),
    top: interpolate(
      x.value,
      [0, width],
      [24, 0 - HEADER_BOTTOM_SPACING - HEADER_TOP_SPACING - HEADER_HEIGHT],
      Extrapolate.CLAMP
    ),
    bottom: interpolate(
      x.value,
      [0, width],
      [20 + FOOTER_TOP_SPACING + FOOTER_BOTTOM_SPACING + FOOTER_HEIGHT, 0],
      Extrapolate.CLAMP
    ),
    left: interpolate(
      x.value,
      [-width, 0, width],
      [-width, 32, 0],
      Extrapolate.CLAMP
    ),
    right: interpolate(
      x.value,
      [-width, 0, width],
      [width + 24, 24, 0],
      Extrapolate.CLAMP
    ),
    borderRadius: interpolate(x.value, [0, width], [24, 0], Extrapolate.CLAMP),
  }));

  return (
    <Animated.View style={[styles.addcard, animatedStyle]}></Animated.View>
  );
}

const styles = StyleSheet.create({
  addcard: {
    position: "absolute",
    backgroundColor: "#13015c",
    // zIndex: 10,
    // top: 0 - HEADER_BOTTOM_SPACING - HEADER_TOP_SPACING - HEADER_HEIGHT,
    // left: 32,
    // right: 24,
    bottom: 20 + FOOTER_TOP_SPACING + FOOTER_BOTTOM_SPACING + FOOTER_HEIGHT,
    // left: 24 + 8,
    // borderRadius: 24,
    // right: 24,
    // bottom: 20 + FOOTER_BOTTOM_SPACING + FOOTER_TOP_SPACING + FOOTER_HEIGHT,
    // top:
    //   20 +
    //   height -
    //   (height - HEADER_HEIGHT - HEADER_BOTTOM_SPACING - HEADER_BOTTOM_SPACING),
  },
});

export default AddCard;
