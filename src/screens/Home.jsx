import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Alert,
  TextInput,
} from "react-native";

import { createGame } from "../utils/api";
import { player } from "../utils/storage";

const HomeScreen = ({ navigation }) => {
  const handleCreateGame = () => {
    console.log(player);
    createGame(player.id)
      .then((res) => {
        navigation.navigate("Game", { id: res.data.id });
      })
      .catch((e) => {
        console.error(e);
        Alert.alert("Game has not been created");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="Create new game"
          onPress={handleCreateGame}
          style={styles.button}
        />
        <Button
          title="Join existing one"
          onPress={() => {
            navigation.navigate("Lobby");
          }}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginHorizontal: 16,
  },
  button: {
    display: "block",
    marginTop: 16,
  },
});

export default HomeScreen;
