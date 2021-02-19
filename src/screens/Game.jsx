import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Alert, Image } from "react-native";
import {
  getGame,
  addMarble,
  rotateQuarter,
  askComputerToPlay,
} from "../utils/api";

import HeaderGame from "../components/HeaderGame.jsx";
import Board from "../components/Board/Board.jsx";
import Advice from "../components/Board/Advice.jsx";

import {
  GAME_FINISHED,
  GAME_STARTED,
  GAME_WAITING_OPPONENT,
  NOT_YOUR_TURN,
  YOU_WIN,
  YOU_LOOSE,
  ADD_MARBLE_STATUS,
} from "../constants/game";
import { PlayerContext } from "../providers/PlayerProvider";

import loadingPNG from "../../assets/loading.png";

const GameScreen = ({ route }) => {
  const [player] = useContext(PlayerContext);
  const [game, setGame] = useState({});

  const getStateStatusFromGame = (game) => {
    // We have so many status & boolean from API.
    // It will be more readable to convert from unique state constant.

    const currentPlayerValue = player.id === game.player1.id ? 1 : 2;

    if (game.winner) {
      return currentPlayerValue === game.winner ? YOU_WIN : YOU_LOOSE;
    }

    if (
      game.status === GAME_WAITING_OPPONENT ||
      game.status === GAME_FINISHED
    ) {
      return game.status;
    }

    if (game.currentPlayer?.id === player.id) {
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
    let interval;
    handleGetGame(route.params.id);
    if (
      (game.state === NOT_YOUR_TURN || game.state === GAME_WAITING_OPPONENT) &&
      !game.againstComputer
    ) {
      interval = setInterval(() => {
        handleGetGame(route.params.id);
      }, 4000);
    }
    return () => {
      // remove interval
      interval && clearInterval(interval);
    };
  }, [route.params.id, game.state]);

  useEffect(() => {
    if (game?.state === NOT_YOUR_TURN && game.againstComputer) {
      askComputerToPlay(game.id).then((res) => {
        setGame(res.data);
      });
    }
  }, [game.state, game.againstComputer]);

  return (
    <SafeAreaView style={styles.container}>
      {game && (
        <>
          <HeaderGame game={game} />
          {game.status === GAME_WAITING_OPPONENT && (
            <Image source={loadingPNG} style={styles.image} />
          )}
          {(game.status === GAME_STARTED || game.status === GAME_FINISHED) && (
            <Board
              game={game}
              onAddMarble={handleAddMarble}
              onRotate={handleRotate}
            />
          )}
          {game.state == ADD_MARBLE_STATUS && (
            <Advice gameId={game.id} gameState={game.state} />
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
  image: {
    width: "100%",
    height: 400,
    margin: "auto",
    marginVertical: 12,
  },
});

export default GameScreen;
