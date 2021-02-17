import { API_URL } from "@env";
import axios from "redaxios";

const api = axios.create({
  baseURL: API_URL,
});

// Used for debugging purpose (i'm sure react native cache this value...)
console.log(API_URL);

export const loginOrCreate = (name) => {
  return api.post("/login", {
    name,
  });
};

export const createGame = (playerId) => {
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

export const addMarble = (gameId, playerId, position) => {
  return api.post(`/games/${gameId}/addMarble`, {
    playerId,
    position,
  });
};

export const rotateQuarter = (gameId, playerId, rotation) => {
  return api.post(`/games/${gameId}/rotateQuarter`, {
    playerId,
    rotation,
  });
};

export const getAdvice = (gameId, playerId) => {
  return api.get(`/games/${gameId}/advice`, {
    playerId,
  });
};
