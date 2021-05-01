import { Dimensions, Platform, StatusBar } from "react-native";

// workaround for Dimensions API sometimes gives incorrect height
export const getDimension = (): { height: number; width: number } => {
  const { width, height: deviceHeight } = Dimensions.get("window");
  console.log(`status bar height: ${StatusBar.currentHeight}`);
  console.log(`window height: ${deviceHeight}`);
  const height = Platform.select({
    ios: deviceHeight,
    android:
      StatusBar.currentHeight! > 24
        ? deviceHeight
        : deviceHeight - StatusBar.currentHeight!,
  })!;

  return { width, height };
};
