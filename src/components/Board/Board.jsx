import React from "react";

import { StyleSheet, View } from "react-native";

import Quarter from "./Quarter.jsx";

const Board = ({ game, onAddMarble, onRotate }) => {
  return (
    <View style={styles.board}>
      <Quarter
        quarterIndex={1}
        game={game}
        onAddMarble={onAddMarble}
        onRotate={onRotate}
      />
      <Quarter
        quarterIndex={2}
        game={game}
        onAddMarble={onAddMarble}
        onRotate={onRotate}
      />
      <Quarter
        quarterIndex={3}
        game={game}
        onAddMarble={onAddMarble}
        onRotate={onRotate}
      />
      <Quarter
        quarterIndex={4}
        game={game}
        onAddMarble={onAddMarble}
        onRotate={onRotate}
      />
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
