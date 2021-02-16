import React from "react";

import { StyleSheet, View } from "react-native";
import { Subheading, useTheme } from "react-native-paper";

import Title from "./Title";
import {
  ADD_MARBLE_STATUS,
  GAME_FINISHED,
  GAME_WAITING_OPPONENT,
  NOT_YOUR_TURN,
} from "../constants/game";
import { player } from "../utils/storage";

const GameScreen = ({ game }) => {
  const { colors } = useTheme();

  const renderTitles = () => {
    if (game.state === GAME_WAITING_OPPONENT) {
      return <Title>You are alone...</Title>;
    }

    if (game.state === GAME_FINISHED) {
      return <Title>This game is finished</Title>;
    }

    const currentPlayerValue = game.player1.id === player.id ? 1 : 2;

    if (game.state === NOT_YOUR_TURN) {
      return (
        <Title
          style={{
            color: currentPlayerValue === 1 ? colors.primary : colors.secondary,
          }}
        >
          Please wait {game.currentPlayer.name}
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
    height: "100px",
  },
});

export default GameScreen;
