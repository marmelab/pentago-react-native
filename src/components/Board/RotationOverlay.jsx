import React from "react";

import { StyleSheet, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

const RotationOverlay = ({ handleRotate }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.overlay}>
      <View style={styles.rotationButton}>
        <IconButton
          icon="rotate-left"
          color={colors.background}
          size={60}
          onPress={() => handleRotate(0)}
        />
      </View>
      <View style={styles.rotationButton}>
        <IconButton
          icon="rotate-right"
          color={colors.background}
          size={60}
          onPress={() => handleRotate(1)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "red",
    opacity: 0.5,
    borderRadius: "8px",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  rotationButton: {
    width: "50%",
    height: "100%",
    backgroundColor: "grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RotationOverlay;
