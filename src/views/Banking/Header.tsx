import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedGestureHandler,
  withSpring,
  useAnimatedProps,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Rect,
  Defs,
  Mask,
  Image as SVGImage,
  Text as SVGText,
  Use,
  ForeignObject,
} from "react-native-svg";

import { useAnimatedValueContext, usePageLayout } from "./context";
import { profile } from "./const";
import {
  HEADER_BOTTOM_SPACING,
  HEADER_LEFT_SPACING,
  HEADER_HEIGHT,
  HEADER_RIGHT_SPACING,
  HEADER_TOP_SPACING,
  HEADER_HORIZONTAL_PADDING,
} from "./measurements";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { snapPoint } from "react-native-redash";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { getDimension } from "./utils";

interface AvatarProps {
  source: any;
}

function Avatar({ source }: AvatarProps) {
  return (
    <View style={styles.avatar}>
      <Image source={source} style={{ height: "100%", width: "100%" }} />
    </View>
  );
}

interface FadingAvatarMaskProps {
  source: any;
  children?: React.ReactNode;
  name?: string;
  label?: string;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

function FadingAvatarMask({
  source,
  children,
  name,
  label,
}: FadingAvatarMaskProps) {
  const { y } = useAnimatedValueContext();

  const animatedProps = useAnimatedProps(() => ({
    fillOpacity: interpolate(y.value, [400, 580], [1, 0], Extrapolate.CLAMP),
  }));

  const animatedRectProps = useAnimatedProps(() => ({
    fillOpacity: interpolate(y.value, [400, 580], [1, 0], Extrapolate.CLAMP),
  }));

  return (
    <View>
      <View style={styles.avatarImage}>
        <Svg width="100%" height="100%" viewBox="0 0 58 58">
          <SVGImage id="profile" href={source} width="58" height="58" />
          <AnimatedCircle
            animatedProps={animatedProps}
            cx="29"
            cy="29"
            r="29"
            fill="#eef"
          />
        </Svg>
      </View>
      <View
        style={{
          width: 58,
          marginTop: 12,
          height: 20,
          position: "relative",
          alignItems: "center",
        }}
      >
        <Svg width="64" height="20" viewBox="0 0 64 20" style={{ zIndex: 2 }}>
          <AnimatedRect
            height="20"
            width="100%"
            rx="10"
            fill="#eef"
            animatedProps={animatedRectProps}
          />
        </Svg>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "SFProDisplay-Medium",
              fontSize: 18,
              color: "#0f0a5b",
            }}
          >
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
}

function Goal() {
  const GOAL_HEIGHT = 160;

  const { y } = useAnimatedValueContext();

  const animatedRectProps = useAnimatedProps(() => ({
    fillOpacity: interpolate(y.value, [400, 580], [1, 0], Extrapolate.CLAMP),
  }));

  return (
    <View
      style={{
        position: "relative",
        paddingHorizontal: HEADER_HORIZONTAL_PADDING,
        marginTop: 32,
        // backgroundColor: "lime",
        height: GOAL_HEIGHT,
      }}
    >
      <Svg
        width="100%"
        height={GOAL_HEIGHT}
        style={{
          position: "absolute",
          left: HEADER_HORIZONTAL_PADDING,
          zIndex: 12,
        }}
      >
        <AnimatedRect
          animatedProps={animatedRectProps}
          height="100%"
          width="100%"
          rx="10"
          fill="#eef"
        />
      </Svg>
      <View
        style={{
          height: GOAL_HEIGHT,
          backgroundColor: "#9fc5fb",
          borderRadius: 20,
        }}
      ></View>
    </View>
  );
}

const { width, height } = getDimension();

function Header() {
  const { y, x, hasExpanded } = useAnimatedValueContext();
  const { width, height } = usePageLayout();

  const handleGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { y: number }
  >({
    onStart: (_, ctx) => {
      ctx.y = y.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      y.value = translationY + ctx.y;
    },
    onEnd: ({ velocityY }, ctx) => {
      const headerDestination = snapPoint(y.value, velocityY, [0, 580]);

      y.value = withSpring(
        headerDestination,
        {
          damping: 100,
          stiffness: 70,
          mass: 0.2,
          velocity: 2,
          overshootClamping: true,
        },
        () => {
          hasExpanded.value = 0;
        }
      );
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(x.value, [0, 60], [1, 0], Extrapolate.CLAMP),
    top: interpolate(
      y.value,
      [0, 500],
      [HEADER_TOP_SPACING, 0],
      Extrapolate.CLAMP
    ),
    bottom: interpolate(
      y.value,
      [0, 500],
      [height - HEADER_HEIGHT - HEADER_TOP_SPACING, 0],
      Extrapolate.CLAMP
    ),
    left: interpolate(
      y.value,
      [0, 500],
      [HEADER_LEFT_SPACING, 0],
      Extrapolate.CLAMP
    ),
    borderRadius: interpolate(
      y.value,
      [0, 500],
      [HEADER_LEFT_SPACING, 0],
      Extrapolate.CLAMP
    ),
    right: interpolate(y.value, [0, 500], [20, 0], Extrapolate.CLAMP),
  }));

  return (
    <Animated.View style={[styles.header, animatedStyle]}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: 86,
            alignItems: "center",
            paddingHorizontal: HEADER_HORIZONTAL_PADDING,
          }}
        >
          <Text style={styles.hello}>
            Hello <Text style={styles.name}>Mine</Text>
          </Text>
          <Avatar source={profile.picture} />
        </View>
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
          <Animated.View style={{ flex: 1 }}>
            <View style={styles.friendList}>
              <FadingAvatarMask source={profile.picture} label="name" />
              <FadingAvatarMask source={profile.picture} label="name" />
              <FadingAvatarMask source={profile.picture} label="name" />
              <FadingAvatarMask source={profile.picture} label="name" />
            </View>
            <Goal />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
}

export default Header;

const styles = StyleSheet.create({
  avatar: {
    height: 58,
    width: 58,
    overflow: "hidden",
    position: "relative",
    borderRadius: 29,
  },
  avatarImage: {
    height: 58,
    width: 58,
    overflow: "hidden",
    position: "relative",
    borderRadius: 29,
  },
  hello: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 24,
    color: "#0f0a5b",
  },
  name: {
    fontFamily: "SFProDisplay-Bold",
    color: "#0f0b59",
  },
  container: {
    height: height,
  },
  avatarMask: {},
  header: {
    backgroundColor: "#dee2fd",
    zIndex: 10,
    position: "absolute",
    overflow: "hidden",
    // top: 12,
    // bottom: height - HEADER_HEIGHT - HEADER_TOP_SPACING,
  },
  friendList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingHorizontal: HEADER_HORIZONTAL_PADDING,
  },
});
