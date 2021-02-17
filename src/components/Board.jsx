import React from "react";

import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "react-native-paper";

const Quarter = ({ index, board }) => {
  const { colors } = useTheme();

  const getColorFromValue = (value) => {
    switch (value) {
      case 1:
        return colors.primary;
      case 2:
        return colors.secondary;
      default:
        return "white";
    }
  };

  const getQuarter = (index) => {
    switch (index) {
      case 1:
      default:
        return board.slice(0, 3).map((row) => row.slice(0, 3));
      case 2:
        return board.slice(0, 3).map((row) => row.slice(3, 6));
      case 3:
        return board.slice(3, 6).map((row) => row.slice(0, 3));
      case 4:
        return board.slice(3, 6).map((row) => row.slice(3, 6));
    }
  };

  return (
    <View
      style={[
        styles.quarter,
        {
          backgroundColor: colors.board,
        },
      ]}
    >
      {getQuarter(index).map((row) => (
        <View style={styles.row}>
          {row.map((value, indexCol) => (
            <TouchableWithoutFeedback>
              <View style={styles.cell}>
                <View
                  style={[
                    styles.marble,
                    {
                      backgroundColor: getColorFromValue(value),
                    },
                  ]}
                ></View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      ))}
    </View>
  );
};

const Board = ({ board }) => {
  return (
    <View style={styles.board}>
      <Quarter index={1} board={board} />
      <Quarter index={2} board={board} />
      <Quarter index={3} board={board} />
      <Quarter index={4} board={board} />
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  quarter: {
    display: "flex",
    flexDirection: "column",
    margin: 4,
    borderRadius: 8,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  cell: {
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  marble: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});

export default Board;
