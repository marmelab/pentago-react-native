import React from "react";

import { StyleSheet } from "react-native";
import { useTheme, Title as RNPTitle } from "react-native-paper";

const Title = ({ children, style }) => {
  return <RNPTitle style={[styles.title, style]}>{children}</RNPTitle>;
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginVertical: "1.6rem",
  },
});

export default Title;
