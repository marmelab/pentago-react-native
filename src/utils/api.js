import "dotenv/config";
import { processColor } from "react-native";
import axios from "redaxios";

const api = axios.create({
  baseURL: process.env.API_URL,
});

export const loginOrCreate = (name) => {
  return api.post("/login", {
    name,
  });
};

export const createGame = (playerId) => {
  console.log(playerId);
  return api.post("/games", {
    playerId,
  });
};

export const joinGame = (gameId, playerId) => {
  return api.post(`/games/${gameId}/join`, {
    playerId,
  });
};

export const getGame = (id) => {
  return api.get(`/games/${id}`);
};

export const getGames = () => {
  return api.get("/games");
};
