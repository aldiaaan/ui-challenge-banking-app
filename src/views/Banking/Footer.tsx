import React from "react";
import { Text, View, Dimensions, StyleSheet, Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { useAnimatedValueContext } from "./context";
import { cards, ExpenseModel } from "./models";

const { width } = Dimensions.get("window");
import {
  FOOTER_HEIGHT,
  FOOTER_TOP_SPACING,
  FOOTER_BOTTOM_SPACING,
} from "./measurements";

function Expense({
  logo,
  name,
  details,
  amount,
  index,
}: ExpenseModel & { index: number }) {
  const input = [index * -width - 80, index * -width, index * -width + 80];
  const { x } = useAnimatedValueContext();

  const options = {
    damping: 100,
    stiffness: 80,
    mass: 0.2,
    overshootClamping: true,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(x.value, input, [0, 1, 0], Extrapolate.CLAMP),
    transform: [
      {
        translateY: interpolate(x.value, input, [12, 0, 12], Extrapolate.CLAMP),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.logo}>
        <Image style={styles.logoImage} source={logo} />
      </View>
      <View style={{ marginLeft: 16, justifyContent: "center", flex: 1 }}>
        <Text style={styles.details}>{details}</Text>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

function Footer() {
  return (
    <View style={styles.footer}>
      {cards.map((card, index) => (
        <Expense
          {...card.expenses[0]}
          index={index}
          key={card.expenses[0].id}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: FOOTER_HEIGHT,
    position: "relative",
    marginTop: FOOTER_TOP_SPACING,
    // backgroundColor: "#eee",
    overflow: "hidden",
    paddingHorizontal: 24,
    marginBottom: FOOTER_BOTTOM_SPACING,
  },
  logoImage: {
    height: "100%",
    width: "100%",
  },
  logo: {
    width: 64,
    overflow: "hidden",
    height: 64,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "#e1e5fe",
  },
  container: {
    position: "absolute",
    left: 24,
    right: 24,
    top: 12,
    bottom: 12,
    justifyContent: "center",
    flexDirection: "row",
  },
  amount: {
    color: "#0c0e25",
    fontFamily: "SFProDisplay-Medium",
    fontSize: 22,
    lineHeight: 32,
  },
  name: {
    color: "#0c0e25",
    fontFamily: "SFProDisplay-Medium",
    fontSize: 20,
    lineHeight: 32,
  },
  details: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 16,
    color: "#9ea0b2",
  },
});

export default Footer;
