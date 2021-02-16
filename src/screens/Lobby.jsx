import React, { useEffect, useCallback, useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";

import { getGames } from "../utils/api";

import GameList from "../components/GameList";

const GameScreen = ({ navigation, route }) => {
  const [games, setGames] = useState();

  useEffect(() => {
    const handleGetGames = async () => {
      const res = await getGames();
      setGames(res.data);
    };
    handleGetGames();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <GameList games={games}></GameList>
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
});

export default GameScreen;