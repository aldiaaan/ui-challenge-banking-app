import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { snapPoint } from "react-native-redash";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { useAnimatedValueContext } from "./context";
import { cards, CardModel } from "./models";

const { width, height } = Dimensions.get("window");

const snapPoints = [width, ...cards.map((_, index) => -index * width)];

function Cards() {
  const {
    x,
    y,
    isSwipingVertical,
    isSwipingHorizontal,
    hasExpanded,
    activeIndex,
  } = useAnimatedValueContext();

  const handleGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      x: number;
      y: number;
      hasDirectionBeenSettled: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      if (
        !ctx.hasDirectionBeenSettled &&
        (Math.abs(translationY) > 0 || Math.abs(translationX) > 0)
      ) {
        if (Math.abs(translationY) > Math.abs(translationX)) {
          isSwipingVertical.value = 1;
          isSwipingHorizontal.value = 0;
        } else {
          isSwipingHorizontal.value = 1;
          isSwipingVertical.value = 0;
        }
        ctx.hasDirectionBeenSettled = 1;
      }
      if (isSwipingHorizontal.value && !hasExpanded.value)
        x.value = translationX + ctx.x;

      if (isSwipingVertical.value) {
        if (hasExpanded.value) {
          y.value = translationY + ctx.y;
        } else {
          if (translationY > 0) y.value = translationY + ctx.y;
        }
      }
    },
    onEnd: ({ velocityY }, ctx) => {
      const destination = snapPoint(x.value, 20, snapPoints);
      activeIndex.value = snapPoints.indexOf(destination);
      const headerDestination = snapPoint(y.value, velocityY, [0, 580]);

      isSwipingHorizontal.value = 0;
      isSwipingVertical.value = 0;

      ctx.hasDirectionBeenSettled = 0;
      hasExpanded.value = headerDestination === 0 ? 0 : 1;

      y.value = withSpring(headerDestination, {
        damping: 100,
        stiffness: 70,
        mass: 0.2,
        velocity: 2,
        overshootClamping: true,
      });

      x.value = withSpring(destination, {
        damping: 100,
        stiffness: 70,
        mass: 0.2,
        velocity: 2,
        overshootClamping: true,
      });
    },
  });
  return (
    <PanGestureHandler onGestureEvent={handleGestureEvent}>
      <Animated.View style={styles.cards}>
        {cards.map((card, index) => (
          <Slide x={x} key={card.id} first={index === 0}>
            <Card {...card} first={index === 0} />
          </Slide>
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
}

interface SlideProps {
  x: Animated.SharedValue<number>;
  children: React.ReactNode;
  first: boolean;
}

function Slide({ x, children, first }: SlideProps) {
  const animatedContainer = useAnimatedStyle(
    () => ({
      left: x.value,
      marginRight: first
        ? interpolate(x.value, [0, -width], [-36, 0], Extrapolate.CLAMP)
        : 0,
    }),
    []
  );

  return (
    <Animated.View style={[styles.slide, animatedContainer]}>
      {children}
    </Animated.View>
  );
}

interface CardProps extends CardModel {
  first?: boolean;
}

function Card({ color, id, expenses, name, first }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: color },
        first && {
          left: 52,
        },
      ]}
    ></View>
  );
}

const styles = StyleSheet.create({
  cards: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
  },
  card: {
    // for better perfomance, use absolute size rather than flex: 1
    borderRadius: 24,
    top: 0,
    bottom: 0,
    left: 24,
    right: 24,
    position: "absolute",
  },
  slide: {
    width,
    position: "relative",
  },
});

export default Cards;
