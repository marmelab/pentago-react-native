import React, { useEffect, useState } from "react";
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
import Title from "../components/Title";

const LobyScreen = () => {
  const [games, setGames] = useState();

  useEffect(() => {
    const handleGetGames = async () => {
      try {
        const res = await getGames();
        setGames(res.data);
      } catch (e) {
        console.error("ERROR", e);
      }
    };
    handleGetGames();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title>Games are waiting you !</Title>
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

export default LobyScreen;
