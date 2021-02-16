import "react-native-gesture-handler";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";

import { createStackNavigator } from "@react-navigation/stack";

import PlayerProvider from "./src/providers/PlayerProvider.jsx";
import LoginScreen from "./src/screens/Login.jsx";
import HomeScreen from "./src/screens/Home.jsx";
import GameScreen from "./src/screens/Game.jsx";
import LobbyScreen from "./src/screens/Lobby.jsx";

import theme from "./theme";

const Stack = createStackNavigator();

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
    <PlayerProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
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
    </PlayerProvider>
  );
}
