import AsyncStorage from "@react-native-community/async-storage";

export const storePlayer = (player) => {
  return AsyncStorage.setItem("player", JSON.stringify(player));
};

export const getPlayerFromStorage = async () => {
  const data = await AsyncStorage.getItem("player");
  if (!data) return null;
  return JSON.parse(data);
};
