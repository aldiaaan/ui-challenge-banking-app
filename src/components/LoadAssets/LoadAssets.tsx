import React from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";

type FontSource = Parameters<typeof Font.loadAsync>[0];

const usePromiseAll = (
  promises: Promise<void | void[] | Asset[]>[],
  cb: () => void
) =>
  React.useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

const useLoadAssets = (assets: number[], fonts: FontSource): boolean => {
  const [ready, setReady] = React.useState(false);
  usePromiseAll(
    [Font.loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))],
    () => setReady(true)
  );
  return ready;
};

const fonts = {
  "SFProDisplay-Bold": require("../../assets/fonts/SFPro/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("../../assets/fonts/SFPro/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("../../assets/fonts/SFPro/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("../../assets/fonts/SFPro/SF-Pro-Display-Medium.otf"),
  "SFProRounded-Semibold": require("../../assets/fonts/SFProRounded/SF-Pro-Rounded-Semibold.otf"),
  "SFProRounded-Medium": require("../../assets/fonts/SFProRounded/SF-Pro-Rounded-Medium.otf"),
};

const LoadAssets = (fonts: FontSource) => {};

export default LoadAssets;
