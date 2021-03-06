import React, { useContext } from "react";

import { StyleSheet, View } from "react-native";
import { Subheading, useTheme } from "react-native-paper";

import Title from "./Title";
import {
  ADD_MARBLE_STATUS,
  GAME_FINISHED,
  GAME_WAITING_OPPONENT,
  NOT_YOUR_TURN,
  YOU_LOOSE,
  YOU_WIN,
} from "../constants/game";
import { PlayerContext } from "../providers/PlayerProvider";

const GameScreen = ({ game }) => {
  const [player] = useContext(PlayerContext);
  const { colors } = useTheme();

  const renderTitles = () => {
    if (!game || !game.id) return;

    const currentPlayerValue = game.player1.id === player.id ? 1 : 2;
    const opponentPlayerValue = currentPlayerValue === 1 ? 2 : 1;

    if (game.state === YOU_WIN) {
      return (
        <Title
          style={{
            color: currentPlayerValue === 1 ? colors.primary : colors.secondary,
          }}
        >
          You win, good job !
        </Title>
      );
    }

    if (game.state === YOU_LOOSE) {
      return (
        <Title
          style={{
            color:
              opponentPlayerValue === 1 ? colors.primary : colors.secondary,
          }}
        >
          You loose... Sorry.
        </Title>
      );
    }

    if (game.state === GAME_WAITING_OPPONENT) {
      return <Title>You are alone...</Title>;
    }

    if (game.state === NOT_YOUR_TURN) {
      return (
        <Title
          style={{
            color:
              opponentPlayerValue === 1 ? colors.primary : colors.secondary,
          }}
        >
          Please wait {game.currentPlayer?.name || "Computer"}
        </Title>
      );
    }

    return (
      <>
        <Title
          style={{
            color: currentPlayerValue === 1 ? colors.primary : colors.secondary,
          }}
        >
          This is your turn
        </Title>
        <Subheading>
          {game.turnStatus === ADD_MARBLE_STATUS
            ? "Please add a marble"
            : "Please rotate a quarter"}
        </Subheading>
      </>
    );
  };

  return <View style={styles.container}>{renderTitles()}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
});

export default GameScreen;
