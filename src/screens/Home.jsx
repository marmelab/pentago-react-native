import React, { useContext, useState } from "react";
import { StyleSheet, View, SafeAreaView, Alert } from "react-native";
import { PlayerContext } from "../providers/PlayerProvider";

import { Button, useTheme } from "react-native-paper";

import { createGame } from "../utils/api";

import Title from "../components/Title";

const HomeScreen = ({ navigation }) => {
  const [player] = useContext(PlayerContext);
  const { colors } = useTheme();
  const [creatingGame, setCreatingGame] = useState(false);
  const handleCreateGame = async () => {
    setCreatingGame(true);
    try {
      const res = await createGame(player.id);
      navigation.navigate("Game", { id: res.data.id });
    } catch (e) {
      console.error(e);
      Alert.alert("Game has not been created");
    } finally {
      setCreatingGame(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title>Ready to aligned marbles ?</Title>
        <Button
          onPress={handleCreateGame}
          style={styles.button}
          loading={creatingGame}
          icon="plus"
          mode="contained"
        >
          Create new game
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("Lobby");
          }}
          style={styles.button}
          color={colors.secondary}
          icon="send"
          mode="contained"
        >
          Join existing one
        </Button>
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
    marginTop: 16,
  },
});

export default HomeScreen;
