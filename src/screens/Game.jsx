import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Alert } from "react-native";
import { getGame, addMarble, rotateQuarter } from "../utils/api";

import HeaderGame from "../components/HeaderGame.jsx";
import Board from "../components/Board/Board.jsx";
import {
  GAME_FINISHED,
  GAME_STARTED,
  GAME_WAITING_OPPONENT,
  NOT_YOUR_TURN,
} from "../constants/game";
import { PlayerContext } from "../providers/PlayerProvider";

const GameScreen = ({ route }) => {
  const [player] = useContext(PlayerContext);
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

  const handleAddMarble = async (position) => {
    try {
      const { data } = await addMarble(game.id, player.id, position);
      data.state = getStateStatusFromGame(data);
      setGame(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRotate = async (rotation) => {
    try {
      const { data } = await rotateQuarter(game.id, player.id, rotation);
      data.state = getStateStatusFromGame(data);
      setGame(data);
    } catch (e) {
      console.error(e);
    }
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

    let interval = setInterval(() => {
      handleGetGame(route.params.id);
    }, 3000);
    return () => {
      // remove interval
      interval && clearInterval(interval);
    };
  }, [route.params.id]);

  return (
    <SafeAreaView style={styles.container}>
      {game && (
        <>
          <HeaderGame game={game} />
          {game.status === GAME_STARTED && (
            <Board
              game={game}
              onAddMarble={handleAddMarble}
              onRotate={handleRotate}
            />
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
