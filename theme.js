import { DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { DarkTheme as PaperDarkTheme } from "react-native-paper";

export default {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: "#fed766",
    secondary: "#78daea",
    accent: "#78daea",
    background: "#333333",
    board: "#dcdfe5",
    surface: "#1f1f1f",
    error: "#78daea",
    text: "white",
    onBackground: "#333333",
    onSurface: "#333333",
    disabled: "#33333380",
    placeholder: "#ffffff50",
    notification: "red",
  },
};
