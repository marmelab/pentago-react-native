import "react-native-gesture-handler";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./src/screens/Login.jsx";
import HomeScreen from "./src/screens/Home.jsx";
import GameScreen from "./src/screens/Game.jsx";
import LobbyScreen from "./src/screens/Lobby.jsx";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Pentago Login" }}
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
  );
}
