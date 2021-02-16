import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, View, SafeAreaView, Alert } from "react-native";

import { getGame } from "../utils/api";
import { listenGameEvent, closeConnection } from "../utils/mercure";

import HeaderGame from "../components/HeaderGame.jsx";
import Board from "../components/Board/Board.jsx";
import {
  GAME_FINISHED,
  GAME_STARTED,
  GAME_WAITING_OPPONENT,
  NOT_YOUR_TURN,
} from "../constants/game";
import { player } from "../utils/storage";

const GameScreen = ({ route }) => {
  const [game, setGame] = useState();

  const getStateStatusFromGame = (game) => {
    // We have so many status & boolean from API.
    // It will be more readable to convert from unique state constant.

    if (
      game.status === GAME_WAITING_OPPONENT ||
      game.status === GAME_FINISHED
    ) {
      return game.status;
    }

    if (game.currentPlayer.id === player.id) {
      return game.turnStatus;
    }

    return NOT_YOUR_TURN;
  };
  useEffect(() => {
    const handleGetGame = (id) => {
      getGame(id)
        .then((res) => {
          const data = res.data;

          data.state = getStateStatusFromGame(data);
          setGame(data);
        })
        .catch((e) => {
          console.error(e);
          Alert.alert("Game not found");
        });
    };

    handleGetGame(route.params.id);
    // Connect to mercure & refetch game ressource for any change
    listenGameEvent(route.params.id, () => {
      handleGetGame(route.params.id);
    });
    return () => {
      // close connection to Mercure
      closeConnection();
    };
  }, [route.params.id, setGame]);

  useEffect(() => {}, [setGame]);
  return (
    <SafeAreaView style={styles.container}>
      {game && (
        <>
          <HeaderGame game={game} />
          {game.status === GAME_STARTED && <Board game={game} />}
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
