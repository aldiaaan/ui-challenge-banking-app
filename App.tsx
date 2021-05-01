import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import Welcome from "./src/views/Welcome";
import Music from "./src/views/Music";
import Banking from "./src/views/Banking";

type Routes = {
  Welcome: undefined;
  Music: undefined;
  Banking: undefined;
};

const fonts = {
  "SFProDisplay-Bold": require("./src/assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./src/assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./src/assets/fonts/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./src/assets/fonts/SF-Pro-Display-Medium.otf"),
};

const Stack = createStackNavigator<Routes>();

const PlaygroundNavigation = () => {
  const [loaded] = useFonts(fonts);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Banking"
            component={Banking}
            options={{ header: () => null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const App = () => {
  return <PlaygroundNavigation />;
};

export default App;
