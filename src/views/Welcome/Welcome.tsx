import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  debug,
  useAnimatedStyle,
  withSpring,
  interpolate,
  withDecay,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const BOX_SIZE = 64;

const initialPosition = {
  x: width / 2 - BOX_SIZE / 2,
  y: height / 2 - BOX_SIZE / 2,
};

const Welcome = () => {
  const translateX = useSharedValue<number>(initialPosition.x);
  const translateY = useSharedValue<number>(initialPosition.y);
  const scale = useSharedValue<number>(1);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number; scale: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
      // ctx.scale = scale.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = translationX + ctx.x;
      translateY.value = translationY + ctx.y;
      scale.value = interpolate(
        translateX.value,
        [-width / 2, width / 2, width],
        [2, 1, 2]
      );
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateY.value = withSpring(initialPosition.y, { velocity: velocityY });
      translateX.value = withSpring(initialPosition.x, { velocity: velocityX });
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.box, animatedStyle]}></Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  box: {
    width: BOX_SIZE,
    position: "relative",
    height: BOX_SIZE,
    backgroundColor: "#aadddd",
    borderRadius: 12,
  },
});

export default Welcome;
