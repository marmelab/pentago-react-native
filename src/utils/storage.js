import AsyncStorage from "@react-native-community/async-storage";

export let player = null;

export const storePlayer = (player) => {
  return AsyncStorage.setItem("player", JSON.stringify(player));
};

export const getPlayerFromStorage = async () => {
  const data = await AsyncStorage.getItem("player");
  if (!data) return null;
  player = JSON.parse(data);
  return player;
};
