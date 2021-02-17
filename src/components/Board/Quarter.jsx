import React, { useContext } from "react";

import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "react-native-paper";
import {
  ADD_MARBLE_STATUS,
  NOT_YOUR_TURN,
  ROTATE_QUARTER_STATUS,
} from "../../constants/game";

import { addMarble, rotateQuarter } from "../../utils/api";
import { PlayerContext } from "../../providers/PlayerProvider";

import RotationOverlay from "./RotationOverlay";

const Quarter = ({ quarterIndex, game }) => {
  const [player] = useContext(PlayerContext);

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

  const handleAddMarble = async (position) => {
    position = convertQuarterPositionIntoBoardPosition(quarterIndex, position);
    try {
      await addMarble(game.id, player.id, position);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRotate = async (rotation) => {
    rotation = rotation + quarterIndex * 2;
    console.log(rotation);
    try {
      await rotateQuarter(game.id, player.id, rotation);
    } catch (e) {
      console.error(e);
    }
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
              key={indexCol}
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
        <RotationOverlay handleRotate={handleRotate} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  quarter: {
    display: "flex",
    flexDirection: "column",
    margin: "4px",
    borderRadius: "8px",
    position: "relative",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  cell: {
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  marble: {
    width: "40px",
    height: "40px",
    borderRadius: "100%",
  },
});

export default Quarter;
