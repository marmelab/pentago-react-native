import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, View, SafeAreaView, Alert } from "react-native";

import { getGame } from "../utils/api";

import Title from "../components/Title";

const GameScreen = ({ route }) => {
  const [game, setGame] = useState();

  useEffect(() => {
    const handleGetGame = (id) => {
      getGame(id)
        .then((res) => {
          setGame(res.data);
        })
        .catch((e) => {
          console.error(e);
          Alert.alert("Game not found");
        });
    };

    handleGetGame(route.params.id);

    const interval = setInterval(() => {
      handleGetGame(route.params.id);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [route.params.id]);
  return (
    <SafeAreaView style={styles.container}>
      {game && (
        <>
          {game.player1 && game.player2 ? (
            <>
              <Text>Welcome both !</Text>
            </>
          ) : (
            <Title>You are alone...</Title>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
    display: "flex",
    alignItems: "center",
  },
});

export default GameScreen;
