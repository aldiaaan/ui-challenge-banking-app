import Animated from "react-native-reanimated";

import { createContext } from "../../utils";

export interface AnimatedValueContext {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
  isSwipingHorizontal: Animated.SharedValue<number>;
  isSwipingVertical: Animated.SharedValue<number>;
  hasExpanded: Animated.SharedValue<number>;
  activeIndex: Animated.SharedValue<number>;
}

export const [
  AnimatedValueProvider,
  useAnimatedValueContext,
] = createContext<AnimatedValueContext>({
  name: "AnimatedValueContext",
  errorMessage:
    "useAnimatedValueContext: `context` is undefined. Seems you forgot to wrap the accordion item parts in `<AccordionItem />` ",
});

export interface PageLayoutContext {
  height: number;
  width: number;
  x: number;
  y: number;
}

export const [
  PageLayoutProvider,
  usePageLayout,
] = createContext<PageLayoutContext>({
  name: "PageLayoutContext",
  errorMessage:
    "usePageLayout: `context` is undefined. Seems you forgot to wrap the accordion item parts in `<AccordionItem />` ",
});
