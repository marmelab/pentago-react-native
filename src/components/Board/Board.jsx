import React from "react";

import { StyleSheet, View } from "react-native";

import Quarter from "./Quarter.jsx";

const Board = ({ game }) => {
  return (
    <View style={styles.board}>
      <Quarter quarterIndex={0} game={game} />
      <Quarter quarterIndex={1} game={game} />
      <Quarter quarterIndex={2} game={game} />
      <Quarter quarterIndex={3} game={game} />
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    marginTop: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

export default Board;
