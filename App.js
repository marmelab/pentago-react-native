import "react-native-gesture-handler";

import * as React from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  Appbar,
} from "react-native-paper";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./src/screens/Login.jsx";
import HomeScreen from "./src/screens/Home.jsx";
import GameScreen from "./src/screens/Game.jsx";
import LobbyScreen from "./src/screens/Lobby.jsx";
import { screensEnabled } from "react-native-screens";

const Stack = createStackNavigator();

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: "#fed766",
    secondary: "#78daea",
    accent: "#78daea",
    background: "#333333",
    board: "#dcdfe5",
    surface: "#1f1f1f",
    error: "#78daea",
    text: "white",
    onBackground: "#333333",
    onSurface: "#333333",
    disabled: "#33333380",
    placeholder: "#ffffff50",
    notification: "red",
  },
};

function CustomNavigationBar({ navigation, previous, scene }) {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={scene.descriptor.options.title} />
    </Appbar.Header>
  );
}

export default function App() {
  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <NavigationContainer theme={CombinedDarkTheme}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Pentago log-in" }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Pentaghome" }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{ title: "Play" }}
          />
          <Stack.Screen
            name="Lobby"
            component={LobbyScreen}
            options={{ title: "Lobby" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
