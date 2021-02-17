import React from "react";

import { StyleSheet } from "react-native";
import { useTheme, Title as PaperTitle } from "react-native-paper";

const Title = ({ children, style }) => {
  return <PaperTitle style={[styles.title, style]}>{children}</PaperTitle>;
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginVertical: 16,
  },
});

export default Title;
