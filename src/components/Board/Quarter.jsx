import React from "react";

import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "react-native-paper";
import {
  ADD_MARBLE_STATUS,
  NOT_YOUR_TURN,
  ROTATE_QUARTER_STATUS,
} from "../../constants/game";

import RotationOverlay from "./RotationOverlay";

const Quarter = ({ quarterIndex, game, onAddMarble, onRotate }) => {
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

  const extractQuarterFromBoard = () => {
    switch (quarterIndex) {
      case 0:
      default:
        return game.board.slice(0, 3).map((row) => row.slice(0, 3));
      case 1:
        return game.board.slice(0, 3).map((row) => row.slice(3, 6));
      case 2:
        return game.board.slice(3, 6).map((row) => row.slice(0, 3));
      case 3:
        return game.board.slice(3, 6).map((row) => row.slice(3, 6));
    }
  };

  const convertQuarterPositionIntoBoardPosition = (quarterIndex, position) => {
    switch (quarterIndex) {
      case 0:
      default:
        return position;
      case 1:
        return [position[0], position[1] + 3];
      case 2:
        return [position[0] + 3, position[1]];
      case 3:
        return [position[0] + 3, position[1] + 3];
    }
  };

  const handleAddMarble = (position) => {
    position = convertQuarterPositionIntoBoardPosition(quarterIndex, position);
    onAddMarble(position);
  };

  const handleRotate = (rotate) => {
    onRotate(rotate + quarterIndex * 2);
  };

  return (
    <View
      style={[
        styles.quarter,
        {
          backgroundColor: colors.board,
          opacity: game.state === NOT_YOUR_TURN ? 0.5 : 1,
        },
      ]}
    >
      {extractQuarterFromBoard().map((row, indexRow) => (
        <View style={styles.row} key={indexRow}>
          {row.map((value, indexCol) => (
            <TouchableWithoutFeedback
              onPress={() => {
                handleAddMarble([indexRow, indexCol]);
              }}
              disabled={game.state !== ADD_MARBLE_STATUS}
              key={`${quarterIndex}-${indexRow}-${indexCol}`}
            >
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
      {game.state === ROTATE_QUARTER_STATUS && (
        <RotationOverlay onRotate={handleRotate} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  quarter: {
    display: "flex",
    flexDirection: "column",
    margin: 4,
    borderRadius: 8,
    position: "relative",
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

export default Quarter;
